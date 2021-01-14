<template>
    <div id="gallery-slider" class="vh-100" v-if="loadFinish && slides.length > 0">
        <agile
            v-if="slides.length >= 5"
            @after-change="e => (currentSlide = e.currentSlide)"
            class="main"
            ref="main"
            :options="options1"
            :as-nav-for="asNavFor1"
        >
            <div class="slide" v-for="(slide, index) in slides" :key="index" :class="`slide--${index}`">
                <img :src="slide" :alt="slide" draggable="false" />
            </div>
            <template slot="caption">{{ gallery[currentSlide].title }}</template>
        </agile>
        <agile
            v-if="slides.length < 5"
            @after-change="e => (currentSlide = e.currentSlide)"
            class="main"
            ref="main"
            :options="options3"
            :as-nav-for="asNavFor1"
        >
            <div class="slide" v-for="(slide, index) in slides" :key="index" :class="`slide--${index}`">
                <img :src="slide" :alt="slide" draggable="false" />
            </div>
            <template slot="caption">{{ gallery[currentSlide].title }}</template>
        </agile>
        <agile v-if="slides.length >= 5" class="thumbnails mb-5" ref="thumbnails" :options="options2" :as-nav-for="asNavFor2">
            <div
                class="slide slide--thumbniail"
                v-for="(slide, index) in slides"
                :key="index"
                :class="`slide--${index}`"
                @click="$refs.thumbnails.goTo(index), $refs.main.goTo(index)"
            >
                <img :src="slide" draggable="false" />
            </div>
            <template slot="prevButton"><i class="fas fa-chevron-left"></i></template>
            <template slot="nextButton"><i class="fas fa-chevron-right"></i></template>
        </agile>
    </div>
    <div v-else-if="!loadFinish" class="vh-100">
        <loading-spinner></loading-spinner>
    </div>
    <div v-else class="vh-100">
        <h1 class="error-msg">Es ist ein Fehler aufgetreten</h1>
    </div>
</template>

<script lang="ts">
import * as galleryService from "../services/gallery.service";
import { VueAgile } from "vue-agile";
import LoadingSpinner from "../components/LoadingSpinner.vue";
import { BackendConfig } from "../backend.config";

export default {
    name: "gallery",
    components: {
        agile: VueAgile,
        LoadingSpinner,
    },
    data() {
        return {
            gallery: [],
            loadFinish: false,
            currentSlide: 0,
            asNavFor1: [],
            asNavFor2: [],
            options1: {
                dots: false,
                fade: true,
                navButtons: false,
            },
            options2: {
                autoplay: true,
                centerMode: true,
                dots: false,
                navButtons: false,
                slidesToShow: 3,
                responsive: [
                    {
                        breakpoint: 600,
                        settings: {
                            slidesToShow: 5,
                        },
                    },

                    {
                        breakpoint: 1000,
                        settings: {
                            navButtons: true,
                        },
                    },
                ],
            },
            options3: {
                dots: true,
                fade: true,
                navButtons: false,
            },
            slides: [],
        };
    },
    created() {
        galleryService
            .getGalleryImages()
            .then(response => {
                this.gallery = response.data;
                for (let i = 0; i < this.gallery.length; i++) {
                    this.slides.push(`${BackendConfig.baseURL}${BackendConfig.images}/${this.gallery[i].imageUri}`);
                }
                this.loadFinish = true;
            })
            .catch(err => {
                console.log({ err });
                this.loadFinish = true;
                this.error = true;
            });
    },
    mounted() {
        this.asNavFor1.push(this.$refs.thumbnails);
        this.asNavFor2.push(this.$refs.main);
    },
};
</script>
<style lang="scss" scoped>
#gallery-slider {
    ::v-deep {
        .thumbnails {
            width: 90%;
            margin: auto;
        }

        .thumbnails .agile__nav-button {
            position: absolute;
            top: 50%;
            -webkit-transform: translateY(-50%);
            transform: translateY(-50%);
        }
        .thumbnails .agile__nav-button--prev {
            left: -40px;
        }
        .thumbnails .agile__nav-button--next {
            right: -40px;
        }
        .agile__nav-button:hover {
            color: #888;
        }
        .agile__dot {
            margin: 0 10px;
        }

        .agile__nav-button {
            background: transparent;
            border: none;
            color: #fff;
            cursor: pointer;
            font-size: 24px;
            height: 600px;
            position: absolute;
            top: 0;
            -webkit-transition-duration: 0.3s;
            transition-duration: 0.3s;
            width: 80px;
        }

        .agile__dot button {
            background-color: $white;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            display: block;
            height: 10px;
            font-size: 0;
            line-height: 0;
            margin: 0;
            padding: 0;
            -webkit-transition-duration: 0.3s;
            transition-duration: 0.3s;
            width: 10px;

            &:hover {
                background-color: lighten($red, 30%);
            }
        }
        .agile__dot--current button {
            background-color: $red;
        }

        .agile__caption {
            text-align: center;
            font-size: 2rem;
            color: $white;
        }

        .slide {
            -webkit-box-align: center;
            align-items: center;
            box-sizing: border-box;
            color: #fff;
            display: -webkit-box;
            display: flex;
            height: auto;
            -webkit-box-pack: center;
            justify-content: center;
        }
        .slide--thumbniail {
            cursor: pointer;
            height: 100px;
            width: 200px;
            padding: 0 5px;
            -webkit-transition: opacity 0.3s;
            transition: opacity 0.3s;
        }
        .slide--thumbniail:hover {
            opacity: 0.75;
        }
        .slide img {
            display: block;
            height: 60vh;
            object-fit: contain;
            width: 90%;
            margin: 4rem;
            cursor: grab;

            @media only screen and (max-width: 600px) {
                height: 30vh;
                margin: 1rem;
                margin-top: 200px;
                object-fit: contain;
                width: 90%;
            }
        }
    }
}
.vh-100 {
    min-height: 100vh;
}
</style>
