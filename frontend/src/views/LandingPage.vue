<template>
    <div id="landing-page">
        <Hero></Hero>
        <Hinweis></Hinweis>
        <WhyChooseUs class="pt-5 vh-small d-flex align-items-center"></WhyChooseUs>
        <AboutUs class="vh-small d-flex align-items-center"></AboutUs>
        <Partners class="pt-5 pb-3 vh-small d-flex align-items-center"></Partners>
        <Announcement class="vh-small d-flex align-items-center"></Announcement>
        <Gallery class="pt-5 vh-big d-flex align-items-center"></Gallery>
        <ContactFormular class="vh-big d-flex align-items-center"></ContactFormular>
    </div>
</template>

<script lang="ts">
import Hero from "../components/landing-page/Hero.vue";
import Hinweis from "../components/landing-page/Hinweis.vue";
import WhyChooseUs from "../components/landing-page/WhyChooseUs.vue";
import AboutUs from "../components/landing-page/AboutUs.vue";
import Partners from "../components/landing-page/Partners.vue";
import ContactFormular from "../components/landing-page/ContactFormular.vue";
import Gallery from "../components/landing-page/Gallery.vue";
import Announcement from "../components/landing-page/Announcement.vue";

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
        Hinweis,
    },
};
</script>

// make all h1 centered
<style lang="scss" scoped>
#landing-page {
    background: $black;
    height: 100%;
}

h2 {
    color: $white;
}

section {
    height: 500px;
}

h1 {
    text-align: center;
}

* {
    color: $white;
}
.vh-small {
    min-height: 100vh;
}
.vh-big {
    min-height: 100vh;
}
@media (min-width: 1600px) {
    .vh-small {
        min-height: 80vh;
    }
    .vh-big {
        min-height: 90vh;
    }
}
</style>

<style>
.content {
    width: 80%;
    margin: auto;
}
</style>
