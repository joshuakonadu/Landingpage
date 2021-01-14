<template>
    <div class="image-upload box hoverPointer d-flex justify-content-center" :class="{ roundBox: round }">
        <form id="avatarform" class="h-100" action="/uploadavatar" method="post" enctype="multipart/form-data">
            <label class=" mb-1 mb-sm-0 mr-1 h-100 col-12 p-0" for="addImage">
                <img v-if="value.imageB64" class="max-height mx-auto" :class="{ round: round }" :src="`data:image/${value.format};base64, ${value.imageB64}`" />

                <div v-else class="h-100 d-flex align-items-center justify-content-center text-center">
                    Klicke um Bild einzufügen
                </div>
                <input id="addImage" @change="updateImage" name="files[]" ref="file" type="file" style="display:none;" />
            </label>
        </form>
    </div>
</template>

<script lang="ts">
export default {
    name: "ImageUpload",
    props: {
        value: { imageB64: String, format: String },
        round: Boolean,
    },
    methods: {
        updateImage(event) {
            const file = event.target.files[0];
            const filetype = file.name
                .split(".")
                .pop()
                .toLowerCase();
            const reader = new FileReader();
            reader.onloadend = () => {
                this.value.imageB64 = (reader.result as string).split(",")[1];
                this.value.format = filetype;
                this.$emit("change", this.value);
            };
            reader.readAsDataURL(file);
        },
    },
};
</script>

<style lang="scss" scoped>
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
    height: 15rem;
    width: 17rem;
}

img {
    object-fit: cover;
}
.round {
    border-radius: 50%;
    height: 200px;
    width: 200px;
}

.roundBox{
    border-radius: 50%;
    width: 210px;
    height: 210px;
}
</style>
