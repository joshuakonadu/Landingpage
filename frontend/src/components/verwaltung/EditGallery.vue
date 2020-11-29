<template>
    <div class="mt-5">
        <router-link tag="button" to="/admin" class="btn btn-info">Zur Übersicht</router-link>
        <hr />
        <button @click="changeMode('add')" class="btn btn-primary">
            Hinzufügen
        </button>
        <div v-if="['add', 'change'].includes(mode)" class="mt-5">
            <div class="row">
                <div class="col-md-5">
                    <div class="mb-3">
                        <label class="form-label">Überschrift</label>
                        <input type="text" v-model="heading" class="form-control" name="heading" placeholder="Überschrift eingeben" />
                    </div>
                </div>
                <div class="col-md-5" :class="{'align-self-center' : mode !== 'add'}">
                    <div v-if="mode == 'add'">
                        <image-upload v-model="image"></image-upload>
                    </div>
                    <button v-if="mode == 'add'" class="btn btn-outline-success mt-5" @click="createImage">
                        Erstellen
                    </button>
                    <button v-else class="btn btn-outline-success"  @click="updateImage">
                        Speichern
                    </button>
                    <button class="ml-4 btn btn-outline-danger" :class="{'mt-5' : mode == 'add'}" @click="resetValues">
                        Abbrechen
                    </button>
                </div>
            </div>
        </div>

        <div v-if="images.length != 0" class="row pb-custom">
            <div class="card mb-3 max-height col-12 col-md-6 col-lg-4 border-0 mb-5 mt-selfTop" v-for="(image, index) in images" :key="image._id">
                <img :src="`${imageBaseUrl}/${image.imageUri}`" class="max-height" alt="Gallerie Bild" />
                <div class="card-body">
                    <div class="col-12 d-flex justify-content-center">
                        <h5 class="card-title">{{ image.title }}</h5>
                    </div>
                    <div class="row justify-content-center">
                        <div class="col-3 col-md-4">
                            <button @click="updateInfo(image._id, index, image.title)" class="btn btn-sm btn-outline-primary">
                                Bearbeiten
                            </button>
                        </div>
                        <div class="col-3 col-md-4">
                            <button @click="deleteVerify(image._id, index)" class="btn btn-sm btn-outline-danger">
                                Löschen
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <delete-modal
            :text="'Wollen sie das Bild wirklick Löschen?'"
            :id="imageId"
            :show="showDelete"
            :index="imageIndex"
            @reset="resetValues"
            @confirm="deleteGalleryImage"
        ></delete-modal>
    </div>
</template>

<script>
import DeleteModal from "@/components/modal/DeleteModal";
import ImageUpload from "./ImageUpload.vue";
import { BackendConfig } from "../../backend.config";
export default {
    components: { ImageUpload, DeleteModal },
    name: "EditGallery",
    data() {
        return {
            mode: "",
            image: { imageB64: null, format: null },
            heading: "",
            imageBaseUrl: BackendConfig.baseURL + BackendConfig.images,
            imageId: "",
            imageIndex: "",
            showDelete: false,
        };
    },
    created() {
        this.$store.dispatch("user/getGalleryImages").then((str) => {
            if (str == "empty") {
                this.$toast.open({
                    message: "Leer",
                    type: "info",
                });
            }
        });
    },
    computed: {
        images() {
            return this.$store.state.user.gallery;
        },
    },
    methods: {
        deleteGalleryImage(id, index) {
            this.$store
                .dispatch("user/deleteGalleryImage", {
                    id: id,
                    index: index,
                })
                .then(() => {
                    this.resetValues()
                    this.$toast.open({
                        message: "Erfolgreich",
                        type: "success",
                    });
                })
                .catch(() => {
                    this.resetValues();
                    this.$toast.open({
                        message: "Fehlgeschlagen",
                        type: "error",
                    });
                });
        },
        updateImage() {
            if (!this.image || !this.heading) return;

            this.$store
                .dispatch("user/updateImageTitle", {
                    title: this.heading,
                    id: this.imageId,
                    index: this.imageIndex,
                })
                .then(() => {
                    this.$toast.open({
                        message: "Erfolgreich",
                        type: "success",
                    });
                    this.resetValues();
                })
                .catch(() => {
                    this.$toast.open({
                        message: "Fehlgeschlagen",
                        type: "error",
                    });
                });
        },
        changeMode(str) {
            this.mode = str;
        },
        updateInfo(id, index, imageTitle) {
            this.mode = "change";
            this.imageId = id;
            this.imageIndex = index;
            this.heading = imageTitle;
            window.scrollTo(0, 0);
        },
        createImage() {
            if (!this.heading || !this.image) return; /*this.$showSaveFailureOwnText("Überschrift und Bild müssen gefüllt sein"); */

            this.$store
                .dispatch("user/addGalleryImage", {
                    imageB64: this.image.imageB64,
                    format: this.image.format,
                    title: this.heading,
                })
                .then(() => {
                    this.$toast.open({
                        message: "Erfolgreich",
                        type: "success",
                    });
                    this.resetValues();
                })
                .catch((err) => {
                    this.$toast.open({
                        message: "Fehlgeschlagen",
                        type: "error",
                    });
                });
        },
        deleteVerify(id, index) {
            this.imageId = id;
            this.imageIndex = index;
            this.showDelete = true;
        },
        resetValues() {
            this.image = { imageB64: null, format: null };
            this.heading = "";
            this.mode = "";
            this.imageId = "";
            this.imageIndex = "";
            this.showDelete = false;
        },
    },
};
</script>

<style scoped>
.box {
    padding: 0.2rem;
    border-radius: 5px;
    border-width: 3px;
    border-style: dashed;
    border-color: #989797;
    width: 17.8rem;
    height: 16rem;
}
.hoverPointer:hover {
    cursor: pointer;
}
.max-height {
    height: 300px;
    width: 100%;
}
.mb-custom {
    margin-bottom: 6rem !important;
}
.pb-custom{
    padding-bottom: 6rem !important;
}
.mt-selfTop{
    margin-top: 5rem;
}
</style>
