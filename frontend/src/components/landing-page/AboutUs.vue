<template>
    <div id="about-us" v-if="aboutUs && aboutUs.image">
        <div class="content">
        <h1>Über mich</h1>
        <div class="about-sec">
            <img :src="`data:image/${aboutUs.image.format};base64, ${aboutUs.image.imageB64}`" alt="name" />
            <div class="text-sec">
                <h4>{{ aboutUs.title }}</h4>
                <p>{{ aboutUs.description }}</p>
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
            .then((response) => {
                this.aboutUs = response.data; // to find out what you need try a console.log(response.data) and look how the field you need is named :)
            })
            .catch((err) => {
                console.log({ err });
                this.error = true;
            });
    },
    computed: {},
    /*methods: {
        openAboutView() {
                                                        //open new AboutUs-page per click on "more"
        },
    },*/
};
</script>

<style lang="scss" scoped>
.about-sec {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    margin: 30px;

    img {
        max-width: 500px;
        height: auto;
        object-fit: cover;

        @media only screen and (max-width: 600px) {
            max-width: 100%;
        }
    }

    .text-sec {
        display: block;
        margin-top: 20px;
        margin-bottom: 20px;
        text-align: center;
        p {
            max-width: 600px;
            word-wrap: break-word;
            white-space: pre-wrap;
            font-size: 20px;
        }
        h4 {
            font-size: 30px;
        }
    }
}
#about-us{
    background-color: #D3D4D9;
}
</style>
