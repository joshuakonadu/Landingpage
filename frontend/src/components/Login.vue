<template>
    <div class="container d-flex justify-content-center align-items-center py-3 mt-5">
        <div class="row">
            <div class="col-login mx-auto">
                <form class="card" @submit="onSubmit">
                    <div class="card-body p-6">
                        <div class="card-title">Melden Sie sich in Ihrem Konto an</div>
                        <div class="form-group">
                            <label class="form-label">
                                Passwort
                            </label>
                            <input class="form-control" v-model="password" required />
                        </div>
                        <div class="form-group"></div>
                        <button class="btn btn-primary">Anmelden</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "login",
    data() {
        return {
            password: "",
        };
    },
    methods: {
        onSubmit(evt) {
            evt.preventDefault();
            this.$store.dispatch("AuthenticationModule/login", { password: this.password }).catch(err => {
 
                    this.$toast.open({
                        message: 'Fehlgeschlagen',
                        type: 'error',
                    });
            });
        },
    },
};
</script>

<style scoped>
div{
    color: black;
}
label{
    color: black;
}
.col-login {
    max-width: 24rem;
}
</style>
