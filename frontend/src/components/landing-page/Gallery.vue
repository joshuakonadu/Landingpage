<template>
    <div id="gallery" v-if="gallery.length && range">
        <div class="landing-content">
            <agile @after-change="e => (currentSlide = e.currentSlide)" :options="myOptions" :fade="true" :swipeDistance="60">
                <img class="image" v-for="i in range" :key="i" :src="`${imageBaseUrl}/${gallery[range - i].imageUri}`" alt="name" />
                <template slot="prevButton"><i class="fas fa-chevron-left"></i></template>
                <template slot="nextButton"><i class="fas fa-chevron-right"></i></template>
                <template slot="caption"
                    >{{ gallery[range - 1 - currentSlide].title }}
                    <router-link to="/galerie">Mehr...</router-link>
                </template>
            </agile>
        </div>
    </div>
</template>

<script lang="ts">
import * as galleryService from "../../services/gallery.service";
import { VueAgile } from "vue-agile";
import { BackendConfig } from "../../backend.config";

export default {
    name: "gallery",
    components: {
        agile: VueAgile,
    },
    data() {
        return {
            gallery: [],
            imageBaseUrl: BackendConfig.baseURL + BackendConfig.images,
            error: false,
            currentSlide: 0,
            range: null,
            myOptions: {
                navButtons: false,

                responsive: [
                    {
                        breakpoint: 600,
                        settings: {
                            dots: true,
                        },
                    },

                    {
                        breakpoint: 601,
                        settings: {
                            navButtons: true,
                            dots: false,
                            infinite: false,
                        },
                    },
                ],
            },
        };
    },
    created() {
        galleryService
            .getGalleryImagesLimit()
            .then(response => {
                this.gallery = response.data;
                this.range = this.gallery.length;
            })
            .catch(err => {
                console.log({ err });
                this.error = true;
            });
    },
};
</script>
<style lang="scss" scoped>
#gallery {
    background-color: $galleryBackground;
    ::v-deep {
        .agile__caption {
            color: $white;
            text-align: center;
            font-size: 2rem;
            margin-top: 30px;
            @media only screen and (max-width: 600px) {
                font-size: 1rem;
            }
        }

        .agile__nav-button {
            background: transparent;
            border: none;
            color: $white;
            cursor: pointer;
            font-size: 24px;
            height: 600px;
            position: absolute;
            top: 0;
            -webkit-transition-duration: 0.3s;
            transition-duration: 0.3s;
            width: 80px;
        }
        .agile__nav-button:hover {
            background-color: rgba(0, 0, 0, 0.5);
            opacity: 1;
        }
        .agile__nav-button--prev {
            left: 0;
        }
        .agile__nav-button--next {
            right: 0;
        }
        .agile__dots {
            bottom: 20px;
            left: 50%;
            position: absolute;
            -webkit-transform: translateX(-50%);
            transform: translateX(-50%);
        }
        .agile__dot {
            margin: 0 10px;
        }
        .agile__dot button {
            background-color: transparent;
            border: 1px solid $white;
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
        }
        .agile__dot--current button,
        .agile__dot:hover button {
            background-color: #fff;
        }

        .slide {
            display: block;
            height: 500px;
            -o-object-fit: cover;
            object-fit: cover;
            width: 100%;
        }
    }
}

.image {
    display: block;
    height: 600px;
    object-fit: cover;
    width: 100%;
    cursor: grab;

    @media only screen and (max-width: 1000px) {
        max-height: 200px;
        max-width: 100%;
    }
}

.caption {
    color: white;
}

a {
    float: right;
    color: $blue;
    text-decoration: none;
}
</style>
