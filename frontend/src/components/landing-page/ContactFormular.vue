<template>
    <div id="contact-form" class="container mx-auto">
        <div class="landing-content">
            <h1 class="section-headline">Noch Fragen?</h1>
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
                                    <label class="text-white">Email-Adresse *</label>
                                    <input name="email" v-model="email" type="email" class="form-control" required />
                                </div>
                            </div>
                            <div class="col-lg-6">
                                <div class="form-group">
                                    <label class="text-white">Telefonnummer</label>
                                    <input v-model="phone" name="phone" type="tel" class="form-control" />
                                </div>
                            </div>
                            <div class="col-lg-6 d-none">
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
                                <button type="submit" @click="send" class="self-btn btn-loading">
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
    name: "ContactFormular",
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
            if (!this.message && !this.email && !this.name) {
                this.$toast.open({
                    message: "Die Relevanten Felder * müssen ausgefüllt sein.",
                    type: "info",
                });
                return;
            }
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

<style lang="scss" scoped>
input,
textarea {
    background: $white;
}

.self-btn {
    background: transparent;
    cursor: pointer;
    font-size: 0.7rem;
    padding: 15px 10px;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: 700;
    outline: none;
    border-radius: 10px;
    border: 3px solid $red;
    color: $white;

    @media (max-width: 600px) {
        width: 100%;
    }
}
.self-btn:hover {
    background: #111;
    transition: 0.2s;
}
</style>
