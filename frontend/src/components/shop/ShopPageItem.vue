<template>
    <div @click="openUrl()">
        <img class="main-image" :src="image" />
        <h3>{{ title }}</h3>
    </div>
</template>

<script lang="ts">
export default {
    name: "ShopPageItem",
    props: ["image", "title", "url"],
    methods: {
        openUrl() {
            window.open(this.url, "_blank");
        },
    },
};
</script>

<style lang="scss" scoped>
div {
    cursor: pointer;
    max-width: 300px;
}
img {
    height: 300px;
    width: 100%;
    object-fit: cover;
    border-radius: 5%;
}

h3 {
    margin-top: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 1.2em;
}
</style>
