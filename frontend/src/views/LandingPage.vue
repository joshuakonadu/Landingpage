<template>
    <div id="landing-page">
        <hero></hero>
        <bouncing-arrow></bouncing-arrow>
        <why-choose-us></why-choose-us>
        <about-us></about-us>
        <announcement></announcement>
        <gallery></gallery>
        <partners></partners>
        <contact-formular></contact-formular>
    </div>
</template>

<script lang="ts">
import Hero from "../components/landing-page/Hero.vue";
import WhyChooseUs from "../components/landing-page/WhyChooseUs.vue";
import AboutUs from "../components/landing-page/AboutUs.vue";
import Partners from "../components/landing-page/Partners.vue";
import ContactFormular from "../components/landing-page/ContactFormular.vue";
import Gallery from "../components/landing-page/Gallery.vue";
import Announcement from "../components/landing-page/Announcement.vue";
import BouncingArrow from "../components/landing-page/BouncingArrow.vue";

export default {
    name: "Landingpage",
    components: {
        Hero,
        WhyChooseUs,
        AboutUs,
        Partners,
        Gallery,
        ContactFormular,
        Announcement,
        BouncingArrow,
    },
};
</script>

<style lang="scss" scoped>
#landing-page {
    background: $black;
    min-height: 100%;

    #why-choose-us,
    #about-us,
    #partners,
    #announcement,
    #gallery,
    #contact-form {
        padding: 10vh 0;
    }
}

* {
    color: $white;
}
</style>
