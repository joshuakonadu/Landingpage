<template>
    <div id="about-us" v-if="aboutUs && aboutUs.image">
        <div class="landing-content">
            <div class="about-sec">
                <img class="size" :src="`data:image/${aboutUs.image.format};base64, ${aboutUs.image.imageB64}`" alt="name" />
                <div class="text-sec">
                    <h3 class="text-break">{{ aboutUs.title }}</h3>
                    <p class="text-break">{{ aboutUs.description }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import * as aboutService from "../../services/about.service";

export default {
    name: "AboutUs",
    data() {
        return {
            aboutUs: { image: null },
            error: false,
        };
    },
    created() {
        aboutService
            .getAbout()
            .then(response => {
                this.aboutUs = response.data;
            })
            .catch(err => {
                console.log({ err });
                this.error = true;
            });
    },
};
</script>

<style lang="scss" scoped>
.about-sec {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;

    img {
        max-width: 500px;
        max-height: 400px;
        object-fit: cover;

        @media only screen and (max-width: 600px) {
            max-width: 100%;
        }
    }

    .text-sec {
        display: block;
        margin-top: 20px;

        p {
            margin-top: 1em;
            max-width: 600px;
            word-wrap: break-word;
            white-space: pre-wrap;
            margin-bottom: 0;
        }
        h3 {
            position: relative;
            display: inline;

            &::after {
                content: "";
                background: $red;
                position: absolute;
                bottom: -0.5rem;
                left: 0;
                height: 5px;
                width: 113%;
            }
        }
    }
}
#about-us {
    background-color: $aboutBackground;
}
</style>
