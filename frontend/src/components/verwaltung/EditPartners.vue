<template>
    <div class="mt-5">
        <router-link tag="button" to="/admin" class="btn btn-info">Zur Übersicht</router-link>
        <hr />
        <button @click="changeMode('add')" class="btn btn-primary">
            Hinzufügen
        </button>
        <div v-if="['change', 'add'].includes(mode)" class="mt-5">
            <div class="row">
                <div class="col-md-5">
                    <div class="mb-3">
                        <label class="form-label">Name</label>
                        <input type="text" required v-model="name" class="form-control" name="name" placeholder="Name eingeben" />
                    </div>
                </div>
                <div class="col-md-5">
                    <div class="mb-3">
                        <label class="form-label">Url-Link</label>
                        <input type="text" required v-model="uri" class="form-control" name="uri" placeholder="Link eingeben" />
                    </div>
                </div>
                <div class="col-12 col-md-6 mt-4">
                    <image-upload class="mx-auto mx-md-0" v-model="image" :round="true"></image-upload>
                    <div class="mt-5 d-flex justify-content-center justify-content-md-start edit-buttons">
                        <button v-if="mode == 'add'" class="btn btn-outline-success" @click="createPartner">
                            Erstellen
                        </button>
                        <button v-else class="btn btn-outline-success" @click="updatePartner">
                            Speichern
                        </button>
                        <button class="btn btn-outline-danger" @click="resetValues">
                            Abbrechen
                        </button>
                    </div>
                </div>
            </div>
            <hr />
        </div>

        <div>
            <div v-if="partners.length != 0" class="row">
                <div class="card max-height col-12 col-md-6 col-lg-4 border-0 mt-5" v-for="(partner, index) in partners" :key="partner._id">
                    <img :src="`data:image/${partner.image.format};base64,${partner.image.imageB64}`" class="mx-auto" alt="Galerie Bild" />
                    <div class="card-body">
                        <div class="col-12 d-flex justify-content-center">
                            <h5 class="card-title">{{ partner.title }}</h5>
                        </div>
                        <div class="row justify-content-center">
                            <button @click="updateInfo(partner.image, partner._id, index, partner.title, partner.uri)" class="btn btn-sm btn-outline-primary">
                                Bearbeiten
                            </button>
                            <button @click="deleteVerify(partner._id, index)" class="btn btn-sm btn-outline-danger ml-2">
                                Löschen
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <delete-modal
            :text="'Wollen sie den Partner wirklick Löschen?'"
            :id="partnerId"
            :show="showDelete"
            :index="partnerIndex"
            @reset="resetValues"
            @confirm="deletePartner"
        ></delete-modal>
    </div>
</template>

<script>
import DeleteModal from "@/components/modal/DeleteModal";
import ImageUpload from "./ImageUpload.vue";
export default {
    components: { ImageUpload, DeleteModal },
    name: "EditPartners",
    data() {
        return {
            mode: "",
            image: { imageB64: null, format: null },
            name: "",
            uri: "http://",
            partnerId: "",
            partnerIndex: "",
            showDelete: false,
        };
    },
    created() {
        this.$store.dispatch("user/getPartners").then(str => {
            if (str == "empty") {
                this.$toast.open({
                    message: "Leer",
                    type: "info",
                });
            }
        });
    },
    computed: {
        partners() {
            return this.$store.state.user.partners;
        },
    },
    methods: {
        deletePartner(id, index) {
            this.$store
                .dispatch("user/deletePartner", {
                    id: id,
                    index: index,
                })
                .then(() => {
                    this.resetValues();
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
        updatePartner() {
            if (!this.name || !this.image || !this.uri) return;

            this.$store
                .dispatch("user/updatePartner", {
                    imageB64: this.image.imageB64,
                    format: this.image.format,
                    title: this.name,
                    uri: this.uri,
                    id: this.partnerId,
                    index: this.partnerIndex,
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
        updateInfo(image, id, index, partnerName, partnerUri) {
            this.mode = "change";
            this.image = image;
            this.uri = partnerUri;
            this.name = partnerName;
            this.partnerId = id;
            this.partnerIndex = index;
            window.scrollTo(0, 0);
        },
        createPartner() {
            if (!this.name || !this.image || !this.uri) return;

            this.$store
                .dispatch("user/addPartners", {
                    imageB64: this.image.imageB64,
                    format: this.image.format,
                    title: this.name,
                    uri: this.uri,
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
        deleteVerify(id, index) {
            this.partnerId = id;
            this.partnerIndex = index;
            this.showDelete = true;
        },
        resetValues() {
            this.image = { imageB64: null, format: null };
            this.name = "";
            this.uri = "http://";
            this.mode = "";
            this.partnerId = "";
            this.partnerIndex = "";
            this.showDelete = false;
        },
    },
};
</script>

<style scoped>
img {
    height: 200px;
    width: 200px;
    object-fit: cover;
    border-radius: 50%;
}
.hoverPointer:hover {
    cursor: pointer;
}
.edit-buttons * {
    margin-right: 1em;
}
</style>
