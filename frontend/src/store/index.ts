//@ts-nocheck
import Vue from "vue";
import Vuex from "vuex";
import AuthenticationModule from "./modules/authentication.module";

Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: { AuthenticationModule },
});
