<template>
    <div class="wrapper">
        <loading-spinner size="100px"></loading-spinner>
    </div>
</template>

<script>
import { Circle8 } from "vue-loading-spinner";

export default {
    name: "LoadingSpinner",
    components: {
        "loading-spinner": Circle8,
    },
};
</script>

<style scoped>
.wrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>
