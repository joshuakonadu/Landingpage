import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

import Mainpage from "../views/MainPage.vue";
import Administration from "../views/Administration.vue";
import Login from "../components/Login.vue";
import AdminOverview from "../views/AdministrationOverview.vue";
import LandingPage from "../views/LandingPage.vue";
import GalleryPage from "../views/GalleryPage.vue";
import ShopPage from "../views/ShopPage.vue";
import AnnouncementsPage from "../views/AnnouncementsPage.vue";
import EditGallery from "../components/verwaltung/EditGallery.vue";
import EditPartners from "../components/verwaltung/EditPartners.vue";
import EditAboutUs from "../components/verwaltung/EditAboutUs.vue";
import EditAnnouncements from "../components/verwaltung/EditAnnouncements.vue";
import EditMessages from "../components/verwaltung/EditMessages.vue"

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
    {
        path: "/",
        component: Mainpage,
        meta: { title: "Home" },
        children: [
            { path: "", component: LandingPage, meta: { title: "Home" } },
            { path: "/login", component: Login, meta: { title: "Login" } },
            {
                path: "/galerie",
                component: GalleryPage,
                meta: { title: "Galerie" },
            },
            {
                path: "/aktuelles",
                component: AnnouncementsPage,
                meta: { title: "Aktuelles" },
            },
        ],
    },
    {
        path: "/admin",
        component: Administration,
        meta: { title: "Verwaltung" },
        children: [
            {
                path: "/admin",
                component: AdminOverview,
                meta: { title: "Verwaltung" },
            },
            {
                path: "/admin/gallery",
                component: EditGallery,
                meta: { title: "Verwaltung" },
            },
            {
                path: "/admin/partners",
                component: EditPartners,
                meta: { title: "Verwaltung" },
            },
            {
                path: "/admin/about",
                component: EditAboutUs,
                meta: { title: "Verwaltung" },
            },
            {
                path: "/admin/announcements",
                component: EditAnnouncements,
                meta: { title: "Verwaltung" },
            },
            {
                path: "/admin/messages",
                component: EditMessages,
                meta: { title: "Verwaltung" },
            },
        ],
    },
    { path: "*", redirect: "/" },
];

export const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

router.beforeEach((to, from, next) => {
    // redirect to login page if not logged in and trying to access a restricted page
    const publicPages = ["login", "", "aktuelles", "galerie", "shop", "product"];
    const domainpath = to.path.split("/")[1];
    const authRequired = !publicPages.includes(domainpath);
    const loggedIn = localStorage.getItem("userElbdogs") || sessionStorage.getItem("userElbdogs");

    if (authRequired && !loggedIn) {
        document.title = to.meta.title;
        return next({ path: "/login", query: { redirect: to.fullPath } });
    }

    document.title = "Landingpage | " + to.meta.title;
    next();
});
