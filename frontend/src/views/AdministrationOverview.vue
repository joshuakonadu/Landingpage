<template>
    <div class="mt-5">
        <div class="col-12 d-flex justify-content-center">
            <h1 class="mx-auto mb-3"><span>Moin Moin!</span></h1>
        </div>

        <div class="row">
            <div class="col-md-3 col-6">
                <span>Ungelesene Nachrichten (Anzahl)</span>
            </div>
            <div class="col">
                <router-link to="/admin/messages" tag="button" class="btn btn-outline-secondary"><span>Zum Postfach</span> ({{ unseen }})</router-link>
            </div>
        </div>
        <hr />
        <div class="admin-buttons">
            <router-link to="/admin/gallery" tag="button" class="btn btn-outline-secondary">
                <i class="far fa-images"></i>
                <span>Galerie verwalten</span>
            </router-link>
            <router-link to="/admin/announcements" tag="button" class="btn btn-outline-secondary">
                <i class="far fa-bullhorn"></i>
                <span>Ankündigungen verwalten</span>
            </router-link>
            <router-link to="/admin/about" tag="button" class="btn btn-outline-secondary">
                <i class="far fa-user"></i>
                <span>"Über mich" verwalten</span>
            </router-link>
            <router-link to="/admin/partners" tag="button" class="btn btn-outline-secondary">
                <i class="far fa-handshake"></i>
                <span>Partner verwalten</span>
            </router-link>
        </div>
        <button @click="logout" class="btn btn-outline-danger w-100 mt-3 pt-3 pb-3">Ausloggen</button>
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

<style lang="scss" scoped>
button {
    color: $black;
    &:hover {
        background-color: lighten($blue, 20%);
    }
}

.admin-buttons {
    height: 50vh;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    grid-gap: 5vh 10vw;
    button {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
        font-size: 1.2rem;

        i {
            font-size: 5rem;
        }

        @media only screen and (max-width: 400px) {
            i {
                font-size: 4rem;
            }
            span {
                display: none;
            }
        }
    }
}
</style>
