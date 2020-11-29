import axios from "axios";
import AuthenticationModule from "@/store/modules/authentication.module";

export const BackendConfig = {
    baseURL: "http://localhost:5000/api",
    images: "/static/images",
    login: "/login",
    gallery: "/gallery",
    about: "/about",
    partners: "/partners",
    notification: "/notification",
    latestAnnouncement: "/announcements/latest",
    announcements: "/announcements",
    galleryLimit: "/gallery/limit",
    notificationUnseen: "/notification/unseen",
    product: "/products"
};
export const ApiClient = axios.create({
    baseURL: BackendConfig.baseURL,
    withCredentials: false,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
        authorization: "Bearer " + AuthenticationModule.state.user,
    },
});
