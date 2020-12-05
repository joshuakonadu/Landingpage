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

        <div v-if="announcements.length != 0" class="row pb-custom">
            <div
                class="card mb-3 max-height col-12 col-md-6 col-lg-4 border-0 mb-5 mt-selfTop"
                v-for="(announcement, index) in announcements"
                :key="announcement._id"
            >
                <img
                    :src="`data:image/${announcement.image.format};base64,${announcement.image.imageB64}`"
                    class="max-height mx-auto"
                    alt="Announcement Bild"
                />
                <div class="card-body">
                    <div class="col-12 d-flex justify-content-center">
                        <h5 class="card-title">{{ announcement.title }}</h5>
                    </div>
                    <div class="col-12 d-flex justify-content-center">
                        <h5 class="card-title">{{ announcement.description }}</h5>
                    </div>
                    <div class="row justify-content-center">
                        <div class="col-3 col-md-4">
                            <button
                                @click="updateInfo(announcement.image, announcement._id, index, announcement.title, announcement.description)"
                                class="btn btn-sm btn-outline-primary"
                            >
                                Bearbeiten
                            </button>
                        </div>
                        <div class="col-3 col-md-4">
                            <button @click="deleteVerify(announcement._id, index)" class="btn btn-sm btn-outline-danger">
                                Löschen
                            </button>
                        </div>
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
            if (!this.title || !this.image || !this.description) return; /*this.$showSaveFailureOwnText("Überschrift und Bild müssen gefüllt sein"); */

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
        },
    },
};
</script>

<style scoped>
img {
    object-fit: scale-down;
}
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
.pb-custom {
    padding-bottom: 6rem !important;
}
.mt-selfTop {
    margin-top: 5rem;
}
</style>
