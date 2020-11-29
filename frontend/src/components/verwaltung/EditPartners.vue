<template>
    <div class="mt-5">
        <router-link tag="button" to="/admin" class="btn btn-info">Zur Übersicht</router-link>
        <hr />
        <button @click="changeMode('add')" class="btn btn-primary">
            Hinzufügen
        </button>
        <div v-if="['change','add'].includes(mode)" class="mt-5">
            <div class="row">
                <div class="col-md-5">
                    <div class="mb-3">
                        <label class="form-label">Name</label>
                        <input type="text" v-model="name" class="form-control" name="name" placeholder="Name eingeben" />
                    </div>
                </div>
                <div class="col-md-5">
                    <div class="mb-3">
                        <label class="form-label">Url-Link</label>
                        <input type="text" v-model="uri" class="form-control" name="uri" placeholder="Link eingeben" />
                    </div>
                </div>
                <div class="col-md-8 mt-4">
                    <image-upload v-model="image" :round="true"></image-upload>
                    <button v-if="mode == 'add'" class="btn btn-outline-success mt-5" @click="createPartner">
                        Erstellen
                    </button>
                    <button v-else class="btn btn-outline-success mt-5" @click="updatePartner">
                        Speichern
                    </button>
                    <button class="ml-4 btn btn-outline-danger mt-5" @click="resetValues">
                        Abbrechen
                    </button>
                </div>
            </div>
        </div>

        <div>
            <div v-if="partners.length != 0" class="row">
                <div class="card mb-3 max-height col-12 col-md-6 col-lg-4 border-0 mb-custom mt-5" v-for="(partner, index) in partners" :key="partner._id">
                    <img :src="`data:image/${partner.image.format};base64,${partner.image.imageB64}`" class="max-height mx-auto" alt="Gallerie Bild" />
                    <div class="card-body">
                        <div class="col-12 d-flex justify-content-center"><h5 class="card-title">{{ partner.title }}</h5></div>
                        <div class="row justify-content-center">
                            <div class="col-3 col-md-4">
                            <button @click="updateInfo(partner.image,partner._id,index,partner.title,partner.uri)" class="btn btn-sm btn-outline-primary">
                                Bearbeiten
                            </button>
                            </div>
                            <div class="col-3 col-md-4">
                            <button @click="deleteVerify(partner._id, index)"  class="btn btn-sm btn-outline-danger">
                                Löschen
                            </button>
                            </div>
                        
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
          @confirm="deletePartner"></delete-modal>
    </div>
</template>

<script>
import DeleteModal from '@/components/modal/DeleteModal'
import ImageUpload from "./ImageUpload.vue";
export default {
    components: { ImageUpload, DeleteModal},
    name: "EditPartners",
    data() {
        return {
            mode: "",
            image: { imageB64: null, format: null },
            name: "",
            uri: "http://",
            partnerId: '',
            partnerIndex: '',
            showDelete:false,
        };
    },
    created(){
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
                    this.resetValues()
                    this.$toast.open({
                        message: "Erfolgreich",
                        type: "success",
                    });
                })
                .catch(() => {
                    this.resetValues()
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
        updateInfo(image,id,index,partnerName,partnerUri){
            this.mode = 'change'
            this.image = image
            this.uri = partnerUri
            this.name = partnerName
            this.partnerId = id
            this.partnerIndex = index
            window.scrollTo(0,0)
        },
        createPartner() {
            if (!this.name || !this.image || !this.uri) return; /*this.$showSaveFailureOwnText("Überschrift und Bild müssen gefüllt sein"); */

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
        deleteVerify(id,index){
          this.partnerId = id;
          this.partnerIndex = index;
          this.showDelete = true;
        },
        resetValues() {
            this.image = { imageB64: null, format: null };
            this.name = "";
            this.uri = "http://";
            this.mode = "";
            this.partnerId = '';
            this.partnerIndex = '';
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
    border-radius: 50%;
    width: 212px;
    height: 212px;
}
.hoverPointer:hover {
    cursor: pointer;
}
.max-height {
    border-radius: 50%;
    height: 200px;
    width: 200px;
}
.mb-custom{
    margin-bottom:6rem !important;
}
</style>
