<template>
    <div id="landing-page">
        <Hero class="pb-5"></Hero>
        <WhyChooseUs class="pt-5 vh-small d-flex align-items-center"></WhyChooseUs>
        <AboutUs class="vh-small d-flex align-items-center"></AboutUs>
        <Partners class="pt-5 pb-3 vh-hall d-flex align-items-center"></Partners>
        <Announcement class="vh-small d-flex align-items-center pt-5 pt-md-0"></Announcement>
        <Gallery class="pt-5 vh-big d-flex align-items-center"></Gallery>
        <ContactFormular id="contact-form" class="vh-big d-flex align-items-center pt-5 pt-md-0"></ContactFormular>
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
    min-height: 60vh;
}
.vh-big {
    min-height: 100vh;
}
.vh-hall {
    min-height: 50vh;
}
@media (min-width: 1600px) {
    .vh-small {
        min-height: 70vh;
    }
    .vh-big {
        min-height: 90vh;
    }
}
</style>
