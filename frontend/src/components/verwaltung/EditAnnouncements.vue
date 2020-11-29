<template>
    <div id="wrapper">
        <router-link tag="button" to="/admin" class="btn btn-info">Zur Übersicht</router-link>
        <hr />
        <div class="top-buttons">
            <button class="btn btn-outline-primary" @click="openEditMode()">
                + Neue Ankündigung erstellen
            </button>
            <button v-if="editingAnnouncement._id" class="btn btn-outline-danger" @click="closeEditMode()">Schließen</button>
        </div>
        <template v-if="editingAnnouncement._id">
            <div class="edit">
                <input class="form-control" placeholder="Titel" v-model="editingAnnouncement.title" />
                <textarea class="form-control" placeholder="Beschreibung" v-model="editingAnnouncement.description" />
                <image-upload v-model="editingAnnouncement.image"></image-upload>
                <button class="btn btn-outline-success" @click="saveAnnouncement(editingAnnouncement)">Speichern</button>
            </div>
        </template>
        <template v-if="announcements.length > 0">
            <div class="announcement-item" v-for="announcement in announcements" :key="announcement._id">
                <div class="text-content">
                    <h2>{{ announcement.title }}</h2>
                    <p>{{ announcement.description }}</p>
                </div>
                <img class="announcement-image" :src="`data:image/${announcement.image.format};base64, ${announcement.image.imageB64}`" />
                <div class="action-buttons">
                    <button class="btn btn-sm btn-outline-primary ml-2" @click="openEditMode(announcement)">Bearbeiten</button>
                    <button class="btn btn-sm btn-outline-danger ml-2" @click="deleteAnnouncement(announcement)">Löschen</button>
                </div>
            </div>
        </template>
    </div>
</template>

<script>
import ImageUpload from "./ImageUpload.vue";
export default {
    name: "EditAnnouncements",
    components: {
        ImageUpload,
    },
    data() {
        return {
            editingAnnouncement: { _id: null, title: "", description: "", image: { imageB64: null, format: null } },
            announcements: [],
        };
    },
    created() {
        this.$store.dispatch("user/getAllAnnouncements").then(() => {
            const announcements = this.$store.state.user.announcements;
            this.announcements = announcements;
        });
    },
    methods: {
        resetEditingAnnouncement(id = null) {
            this.editingAnnouncement = { _id: id, title: "", description: "", image: { imageB64: null, format: null } };
        },
        openEditMode(announcement) {
            if (announcement) this.editingAnnouncement = announcement;
            else this.resetEditingAnnouncement(-1);
        },
        closeEditMode() {
            this.resetEditingAnnouncement();
        },
        saveAnnouncement(announcement) {
            if (!announcement.title || !announcement.image || !announcement.description || announcement.description.length >= 1000)
                return this.$toast.open({
                    message: "Fehlgeschlagen",
                    type: "error",
                });
            if (announcement._id !== -1) {
                this.$store
                    .dispatch("user/updateAnnouncement", {
                        id: announcement._id,
                        title: announcement.title,
                        description: announcement.description,
                        image: announcement.image,
                    })
                    .then(() => {
                        console.log("Success updating announcement");
                        this.closeEditMode();
                        return this.$toast.open({
                            message: "Erfolgreich",
                            type: "success",
                        });
                    })
                    .catch(err => {
                        console.log("Failure updating announcement", err);
                        return this.$toast.open({
                            message: "Fehlgeschlagen",
                            type: "error",
                        });
                    });
            } else {
                this.$store
                    .dispatch("user/addAnnouncement", { title: announcement.title, description: announcement.description, image: announcement.image })
                    .then(() => {
                        this.closeEditMode();
                        return this.$toast.open({
                            message: "Erfolgreich",
                            type: "success",
                        });
                    })
                    .catch(err => {
                        return this.$toast.open({
                            message: "Fehlgeschlagen",
                            type: "error",
                        });
                    });
            }
        },
        deleteAnnouncement(announcement) {
            this.$store
                .dispatch("user/deleteAnnouncement", { id: announcement._id })
                .then(() => {
                    return this.$toast.open({
                        message: "Erfolgreich",
                        type: "success",
                    });
                })
                .catch(err => {
                    return this.$toast.open({
                        message: "Fehlgeschlagen",
                        type: "error",
                    });
                });
        },
    },
};
</script>

<style lang="scss" scoped>
#wrapper {
    padding-top: 100px;
}

.top-buttons {
    button {
        margin-right: 10px;
    }
}

.edit {
    display: flex;
    flex-direction: column;

    input {
        margin: 10px 0;
    }
}

input,
textarea {
    color: black;
}

.announcement-item {
    margin: 50px 0;
    display: flex;
    align-items: center;
    justify-content: space-around;

    .text-content {
        flex-direction: column;
        width: 70%;

        p {
            white-space: pre-wrap;
        }
    }

    img.announcement-image {
        width: 10vw;
        min-width: 70px;
        height: auto;
        margin-left: auto;
        padding-left: min(10px);
    }

    .action-buttons {
        display: flex;
        flex-direction: row;

        

        @media only screen and (max-width: 600px) {
            flex-direction: column;
        }
    }
}
</style>
