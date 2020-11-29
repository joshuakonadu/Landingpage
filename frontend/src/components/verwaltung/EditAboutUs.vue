<template>
    <div class="mt-5">
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
                </div>
                <div class="col-lg-8 mt-4">
                    <image-upload v-model="image"></image-upload>
                    <button class="btn btn-success mt-5" @click="createAbout">
                        Erstellen
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
        };
    },
    created() {
        this.$store
            .dispatch("user/getAbout")
            .then(data => {
                // WHY data here?
                const { image, title, description } = this.$store.state.user.aboutUs;
                this.image = image;
                this.title = title;
                this.description = description;
            })
            .catch(err => {
                this.$toast.open({
                    message: "Noch Kein Über uns vorhanden",
                    type: "info",
                });
            });
    },
    methods: {
        createAbout() {
            if (!this.title || !this.image.imageB64 || !this.description || this.description.length >= 1000)
                return console.log("Description.length max. 1000"); /*this.$showSaveFailureOwnText("Überschrift und Bild müssen gefüllt sein"); */

            this.$store
                .dispatch("user/addAbout", {
                    image: this.image,
                    title: this.title,
                    description: this.description,
                })
                .then(() => {
                    console.log("Success aboutus");
                    // show snackbar or something (we have to decide!!!)
                })
                .catch(() => {
                    console.log("Failure aboutus");
                    // show snackbar or something (we have to decide!!!)
                });
        },
    },
};
</script>

<style lang="scss" scoped></style>
