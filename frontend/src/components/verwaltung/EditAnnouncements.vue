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
                        <input type="text" v-model="title" class="form-control" name="title" placeholder="Überschrift eingeben" />
                    </div>
                </div>
                <div class="col-lg-5">
                    <div class="mb-3">
                        <label class="form-label">Beschreibung</label>
                        <textarea rows="7" v-model="description" class="form-control" />
                    </div>
                </div>
                <div class="col-md-5" :class="{ 'align-self-center': mode !== 'add' }">
                    <div v-if="mode == 'add'">
                        <image-upload v-model="image"></image-upload>
                    </div>
                    <button v-if="mode == 'add'" class="btn btn-outline-success mt-5" @click="createAnnouncement">
                        Erstellen
                    </button>
                    <button v-else class="btn btn-outline-success" @click="updateAnnouncement">
                        Speichern
                    </button>
                    <button class="ml-4 btn btn-outline-danger" :class="{ 'mt-5': mode == 'add' }" @click="resetValues">
                        Abbrechen
                    </button>
                </div>
            </div>
        </div>

        <div v-if="announcements.length != 0" class="grid-container mt-5">
            <div class="d-flex flex-column border-0" v-for="(announcement, index) in announcements" :key="announcement._id">
                <img
                    :src="`data:image/${announcement.image.format};base64,${announcement.image.imageB64}`"
                    class="max-height mx-auto"
                    alt="Announcement Bild"
                />
                <div>
                    <div class="col-12 d-flex flex-column justify-content-center mt-2">
                        <h5>{{ announcement.title }}</h5>
                        <span class="timestamp">{{ getDate(announcement.createdAt) }}</span>
                    </div>
                    <div class="row justify-content-center mt-2 mb-4">
                        <button
                            @click="updateInfo(announcement.image, announcement._id, index, announcement.title, announcement.description)"
                            class="btn btn-sm btn-outline-primary"
                        >
                            Bearbeiten
                        </button>
                        <button @click="deleteVerify(announcement._id, index)" class="btn btn-sm btn-outline-danger ml-2">
                            Löschen
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <delete-modal
            :text="'Möchtest du die Neuigkeit wirklich löschen?'"
            :id="announcementId"
            :show="showDelete"
            :index="announcementIndex"
            @reset="resetValues"
            @confirm="deleteAnnouncement"
        ></delete-modal>
    </div>
</template>

<script>
import DeleteModal from "@/components/modal/DeleteModal";
import ImageUpload from "./ImageUpload.vue";
import * as dateService from "../../services/date.service";

export default {
    components: {
        ImageUpload,
        DeleteModal,
    },
    name: "EditAnnouncements",
    data() {
        return {
            mode: "",
            image: { imageB64: null, format: null },
            title: "",
            description: "",
            announcementId: "",
            announcementIndex: "",
            showDelete: false,
        };
    },
    created() {
        this.$store.dispatch("user/getAllAnnouncements").then(str => {
            if (str == "empty") {
                this.$toast.open({
                    message: "Leer",
                    type: "info",
                });
            }
        });
    },
    computed: {
        announcements() {
            return this.$store.state.user.announcements;
        },
    },
    methods: {
        getDate(date) {
            return dateService.convertISODate(date);
        },
        deleteAnnouncement(id, index) {
            this.$store
                .dispatch("user/deleteAnnouncement", {
                    id: id,
                    index: index,
                })
                .then(() => {
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
                })
                .finally(() => {
                    this.showDelete = false;
                });
        },
        updateAnnouncement() {
            if (!this.title || !this.image || !this.description) return;

            this.$store
                .dispatch("user/updateAnnouncement", {
                    image: this.image,
                    title: this.title,
                    description: this.description,
                    id: this.announcementId,
                    index: this.announcementIndex,
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
        updateInfo(image, id, index, announcementTitle, announcementDesc) {
            this.mode = "change";
            this.image = image;
            this.title = announcementTitle;
            this.description = announcementDesc;
            this.announcementId = id;
            this.announcementIndex = index;
            window.scrollTo(0, 0);
        },
        createAnnouncement() {
            if (!this.title || !this.image.imageB64 || !this.description) {
                this.$toast.open({
                    message: "Bitte Füllen Sie alle Felder aus.",
                    type: "info",
                });
                return;
            }
            this.$store
                .dispatch("user/addAnnouncement", {
                    image: this.image,
                    title: this.title,
                    description: this.description,
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
            this.announcementId = id;
            this.announcementIndex = index;
            this.showDelete = true;
        },
        resetValues() {
            this.image = { imageB64: null, format: null };
            this.title = "";
            this.description = "";
            this.mode = "";
            this.announcementId = "";
            this.announcementIndex = "";
            this.showDelete = false;
            this.$forceUpdate()
        },
    },
};
</script>

<style lang="scss" scoped>
.grid-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    grid-template-rows: repeat(auto-fit, minmax(300px, 1fr));
    grid-gap: 5vh 1vw;
}

img {
    height: 250px;
    width: 100%;
    object-fit: cover;
    margin: auto;
}

h5 {
    height: 3rem;
    overflow: hidden;
}
</style>
