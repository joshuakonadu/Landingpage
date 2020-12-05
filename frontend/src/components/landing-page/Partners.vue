<template>
    <div id="partners" v-if="partners.length">
        <div class="landing-content">
            <h1 class="section-headline">Partner</h1>
            <div v-dragscroll="true" @dragscrollstart="showFade = false" class="images" :class="{ 'fade-partners': showFade }">
                <div v-for="partner in partners" :key="partner.id">
                    <img @click="openPartner(partner.uri)" :src="`data:image/${partner.image.format};base64, ${partner.image.imageB64}`" :alt="partner.title" />
                    <h4>{{ partner.title }}</h4>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import * as partnerService from "../../services/partner.service";
import { dragscroll } from "vue-dragscroll";

export default {
    name: "Partners",
    directives: {
        dragscroll,
    },
    data() {
        return {
            partners: [],
            error: false,
            showFade: true,
        };
    },
    created() {
        partnerService
            .getPartners()
            .then(response => {
                this.partners = response.data;
            })
            .catch(err => {
                console.log({ err });
                this.error = true;
            });
    },
    computed: {},
    methods: {
        openPartner(link: string) {
            window.open(link, "_blank");
        },
    },
};
</script>

<style lang="scss" scoped>
.fade-partners {
    @media only screen and (min-width: 600px) {
        mask-image: linear-gradient(to right, black 70%, transparent 100%);
    }
}

#partners {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: auto;
    background-color: $partnerBackground;
}

.images {
    position: relative;
    max-width: 100%;
    display: flex;
    flex-wrap: nowrap;
    flex-direction: row;
    text-align: center;
    justify-content: space-between;
    overflow-x: scroll;
    cursor: grab;

    // &::after {
    //     content: "";
    //     position: absolute;
    //     z-index: 1;
    //     bottom: 0;
    //     left: 0;
    //     background: red;
    // }

    scrollbar-width: none;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
        display: none;
    }

    @media only screen and (max-width: 600px) {
        flex-direction: column;
        align-items: center;
        cursor: default;
    }

    h4 {
        text-align: center;
    }

    img {
        border-radius: 50%;
        width: 200px;
        height: 200px;
        margin: 20px;
        object-fit: cover;
        cursor: pointer;
    }
}
</style>
