<template>
    <div id="main-page">
        <top-nav></top-nav>
        <router-view />
        <page-footer></page-footer>
    </div>
</template>

<script>
import mainpageModule from "@/store/modules/mainpage.module";
export default {
    name: "Home",
    components: {
        topNav: () => import("@/components/TopNav.vue"),
        pageFooter: () => import('@/components/PageFooter.vue')
    },
    created() {
        if (!this.$store.state.mainpage) this.$store.registerModule("mainpage", mainpageModule);
    },
};
</script>
<style lang="scss">
#main-page {
    min-height: 100vh;
    background-color: $black;
}
</style>
