<template>
    <div id="partners" v-if="partners.length">
        <div class="landing-content">
            <h1 class="section-headline">Schaut doch mal hier vorbei</h1>
            <div class="images" :class="{ 'd-flex space-evenly flex-wrap': partners.length < 6 }">
                <div class="" v-for="partner in partners" :key="partner.id" data-dragscroll>
                    <img @click="openPartner(partner.uri)" :src="`data:image/${partner.image.format};base64, ${partner.image.imageB64}`" :alt="partner.title" />
                    <h4>{{ partner.title }}</h4>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import * as partnerService from "../../services/partner.service";

export default {
    name: "Partners",
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
#partners {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: $partnerBackground;
}
.space-evenly {
    justify-content: space-evenly;
}

h1 {
    margin-bottom: 1em;
}

.images {
    position: relative;
    max-width: 100%;
    display: flex;
    flex-wrap: nowrap;
    flex-direction: row;
    text-align: center;
    overflow-x: auto;
    cursor: grab;

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
