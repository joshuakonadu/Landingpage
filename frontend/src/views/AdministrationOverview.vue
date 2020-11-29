<template>
    <div class="mt-5">
        <div class="col-12 d-flex justify-content-center">
            <h1 class="mx-auto"><span>Moin</span></h1>
        </div>

        <div class="row">
            <div class="col-md-3 col-6">
                <span>Ungelesene Nachrichten (Anzahl)</span>    
            </div>
            <div class="col">
                <router-link to="/admin/messages" tag="button" class="btn btn-outline-secondary"><span>Zum Postfach</span>  ({{ unseen }})</router-link>
            </div>
        </div>
        <hr />
        <div>
            <router-link to="/admin/gallery" tag="button" class="btn btn-outline-secondary">Galerie verwalten</router-link>
        </div>
        <div class="mt-3">
            <router-link to="/admin/announcements" tag="button" class="btn btn-outline-secondary">Aktuelles verwalten</router-link>
        </div>
        <div class="mt-3">
            <router-link to="/admin/about" tag="button" class="btn btn-outline-secondary">About verwalten</router-link>
        </div>
        <div class="mt-3">
            <router-link to="/admin/partners" tag="button" class="btn btn-outline-secondary">Partner verwalten</router-link>
        </div>
        <div class="mt-3">
            <button @click="logout" class="btn btn-outline-danger">Ausloggen</button>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
export default {
    name: "Home",
    created() {
        this.$store.dispatch("user/getUnseen");
    },
    methods: {
        logout() {
            this.$store.dispatch("AuthenticationModule/logout");
        },
    },
    computed: {
        unseen() {
            return this.$store.state.user.unseenMessages;
        },
    },
};
</script>

<style scoped></style>
