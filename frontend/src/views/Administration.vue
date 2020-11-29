<template>
    <div class="container">
        <router-view />
    </div>
</template>

<script>
// @ is an alias to /src
import verwaltungModule from "@/store/modules/verwaltung.module";
export default {
    name: "Administration",
    created() {
        if (!this.$store.state.user) this.$store.registerModule("user", verwaltungModule);
    },
};
</script>
<style lang="scss" scoped>
div {
    color: black;
}

</style>
