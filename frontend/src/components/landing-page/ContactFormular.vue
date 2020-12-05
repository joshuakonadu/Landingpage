<template>
    <div class="container mx-auto">
        <div class="landing-content">
            <h1 class="section-headline">Kontaktformular</h1>
            <div class="row justify-content-center mt-5">
                <div class="col-md-8">
                    <form v-on:submit.prevent="send">
                        <div class="row">
                            <div class="col-lg-6">
                                <div class="form-group">
                                    <label class="text-white">Ihr Name *</label>
                                    <input name="name" v-model="name" type="text" class="form-control" required />
                                    <div class="invalid-feedback">
                                        Bitte geben Sie Ihren Namen ein.
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-6">
                                <div class="form-group">
                                    <label class="text-white">Email-Addresse *</label>
                                    <input name="email" v-model="email" type="email" class="form-control" required />
                                </div>
                            </div>
                            <div class="col-lg-6">
                                <div class="form-group">
                                    <label class="text-white">Telefonnummer</label>
                                    <input v-model="phone" name="phone" type="tel" class="form-control" />
                                </div>
                            </div>
                            <div class="col-lg-6 notForUser">
                                <div class="form-group">
                                    <label class="text-white">Thema</label>
                                    <input v-model="subject" name="subject" type="text" class="form-control" />
                                </div>
                            </div>
                            <div class="col-12">
                                <div class="form-group">
                                    <label for="message text-white">Nachricht:</label>
                                    <textarea
                                        class="form-control"
                                        v-model="message"
                                        name="message"
                                        rows="5"
                                        placeholder="Schreiben Sie ihr Anliegen hier hinein."
                                        required
                                    ></textarea>
                                </div>
                            </div>
                            <div class="col">
                                <button type="submit" @click="send" class="self-btn selfbtn-4 btn-loading">
                                    <span>Abschicken</span>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Contact-Form",
    data() {
        return {
            phone: "",
            message: "",
            subject: "",
            name: "",
            email: "",
        };
    },
    methods: {
        send() {
            this.$store
                .dispatch("mainpage/sendNotification", {
                    phone: this.phone,
                    message: this.message,
                    subject: this.subject,
                    name: this.name,
                    email: this.email,
                })
                .then(() => {
                    this.$toast.open({
                        message: "Erfolgreich gesendet",
                        type: "success",
                    });
                    this.resetState();
                })
                .catch(() => {
                    this.$toast.open({
                        message: "Fehlgeschlagen",
                        type: "error",
                    });
                });
        },
        resetState() {
            this.phone = "";
            this.message = "";
            this.subject = "";
            this.name = "";
            this.email = "";
        },
    },
};
</script>

<style scoped>
.notForUser {
    display: none;
}
.self-btn {
    border: none;
    color: inherit;
    background: none;
    cursor: pointer;
    font-size: 0.7rem;
    padding: 15px 10px;
    margin-bottom: 2rem;
    display: inline-block;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: 700;
    outline: none;
    position: relative;
}
.selfbtn-4 {
    border-radius: 10px;
    border: 3px solid #fff;
    color: #fff;
    overflow: hidden;
}
.self-btn:hover {
    background: white;
    color: black;
}
</style>
