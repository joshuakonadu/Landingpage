<template>
    <div v-if="!isLoading" class="shop-content mb-5">
        <template v-if="products.length > 0">
            <template v-for="product in products">
                <shop-page-item :image="product.mainImageUri" :title="product.title" :url="product.etsyUrl" :key="product.id" class="item"></shop-page-item>
            </template>
        </template>
        <template v-else>
            <h1 style="text-align: center">Keine Produkte verfügbar</h1>
        </template>
    </div>
    <div v-else-if="isLoading">
        <loading-spinner></loading-spinner>
    </div>
    <div v-else>
        <h1 class="error-msg">Es ist ein Fehler aufgetreten</h1>
    </div>
</template>

<script lang="ts">
import LoadingSpinner from "../components/LoadingSpinner.vue";
import ShopPageItem from "../components/shop/ShopPageItem.vue";

type Product = {
    id: number;
    title: string;
    mainImageUri: string;
    etsyUrl: string;
};

export default {
    name: "Shop",
    components: {
        ShopPageItem,
        LoadingSpinner,
    },
    data() {
        return {
            isLoading: true,
        };
    },
    created() {
        this.$store.dispatch("mainpage/getProducts").then(() => {
            this.isLoading = false;
        });
    },
    computed: {
        products(): Product[] {
            return this.$store.state.mainpage.products;
        },
    },
};
</script>

<style scoped lang="scss">
* {
    color: $white;
}

.shop-content {
    margin: auto;
    margin-top: 50px;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 50px 7vw;

    @media only screen and (min-width: 500px) {
        width: 80%;
    }

    .item {
        margin: auto;
    }
}
</style>
