import * as userService from "@/services/user.service";
import { router } from "@/router";
import jwtdecode from "jwt-decode";

const user = localStorage.getItem("userlandingpage") || sessionStorage.getItem("userlandingpage");
const initialState = user ? { status: { loggedIn: true }, user, username: jwtdecode(user).username } : { status: {}, user: null };

export default {
    namespaced: true,
    state: initialState,
    actions: {
        login({ commit }, data) {
            return userService
                .login(data)
                .then(user => {
                    try {
                        commit("loginSuccess", { user });
                    }
                    catch (err) {
                        return
                    }
                })
                .catch(() => {
                    throw Error("not authorized")
                });
        },
        logout({ commit }) {
            userService.logout();
            commit("logout");
        },
    },
    mutations: {
        loginRequest(state, user) {
            state.status = { loggingIn: true };
            state.user = user;
        },
        loginSuccess(state, { user, noRedirect }) {

            state.status = { loggedIn: true };
            state.user = user.data;
            if (state.user) {
                localStorage.setItem("userlandingpage", state.user);
            }
            if (noRedirect) {
                return;
            }
            if (router.currentRoute.query.redirect) {
                router.push(router.currentRoute.query.redirect);
                window.location.reload()
            } else {
                router.push("/admin");
                window.location.reload()

            }
            this._vm.$set(state, "username", jwtdecode(user.data.token).username);
        },
        logout(state) {
            state.status = {};
            state.user = null;
            router.push("/");
        },
        setToken(state, { token }) {
            state.status = { loggingIn: true };
            state.user = token;
        },
    },
};
