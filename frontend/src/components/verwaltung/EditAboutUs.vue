<template>
    <div class="mt-5 mb-5">
        <router-link tag="button" to="/admin" class="btn btn-info">Zur Übersicht</router-link>
        <hr />
        <div class="mt-5">
            <div class="row">
                <div class="col-lg-5">
                    <div class="mb-3">
                        <label class="form-label">Überschrift</label>
                        <input type="text" v-model="title" class="form-control" name="title" />
                    </div>
                </div>
                <div class="col-lg-5">
                    <div class="mb-3">
                        <label class="form-label">Beschreibung</label>
                        <textarea rows="7" v-model="description" class="form-control" />
                    </div>
                    <div v-bind:style="{ color: varifyColor }">
                        <p class="charNum">{{ charChecker }}</p>
                    </div>
                </div>
                <div class="col-lg-8 mt-4">
                    <image-upload v-model="image"></image-upload>
                    <button class="btn btn-success my-5" @click="createAbout">
                        Speichern
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ImageUpload from "./ImageUpload.vue";
export default {
    name: "EditAboutUs",
    components: {
        ImageUpload,
    },
    data() {
        return {
            image: { imageB64: "", format: "" },
            title: "",
            description: "",
            colors: ["black", "red"],
        };
    },
    created() {
        this.$store
            .dispatch("user/getAbout")
            .then(() => {
                const { image, title, description } = this.$store.state.user.aboutUs;
                this.image = image;
                this.title = title;
                this.description = description;
            })
            .catch(() => {
                this.$toast.open({
                    message: "Noch kein 'Über mich' vorhanden",
                    type: "info",
                });
            });
    },
    computed: {
        charChecker() {
            if (this.description.length <= 1000) {
                return this.description.length + "/1000";
            } else {
                return "Der Text ist zu lang: " + this.description.length + "/1000";
            }
        },
        varifyColor() {
            if (this.description.length <= 1000) {
                return this.colors[0];
            } else {
                return this.colors[1];
            }
        },
    },
    methods: {
        createAbout() {
            if (!this.title || !this.image.imageB64 || !this.description || this.description.length >= 1000){
                this.$toast.open({
                        message: "Bitte Füllen Sie alle Felder aus.",
                        type: "info",
                    });
                    return;
                } 
            this.$store
                .dispatch("user/addAbout", {
                    image: this.image,
                    title: this.title,
                    description: this.description,
                })
                .then(() => {
                    this.$toast.open({
                        message: "Erfolgreich",
                        type: "success",
                    });
                })
                .catch(() => {
                    this.$toast.open({
                        message: "Es ist ein Fehler aufgetreten",
                        type: "error",
                    });
                });
        },
    },
};
</script>

<style lang="scss" scoped></style>
