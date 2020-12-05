import "@/styles/globals.scss";
import Vue from "vue";
import VueToast from "vue-toast-notification";
import "vue-toast-notification/dist/theme-default.css";
import App from "./App.vue";
import { router } from "./router";
import { store } from "./store";

Vue.use(VueToast, {
    position: "top",
    duration: 3000,
});

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount("#app");
