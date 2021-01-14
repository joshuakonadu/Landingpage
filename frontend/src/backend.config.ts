import AuthenticationModule from "@/store/modules/authentication.module";
import axios from "axios";

const getBaseUrlForEnv = () => {
    if (process.env.NODE_ENV === "production") return "https://landingpage.de/api";
    else if (process.env.NODE_ENV === "dev") return "https://dev.landingpage.de/api";
    else return "http://localhost:5000/api";
};

export const BackendConfig = {
    baseURL: getBaseUrlForEnv(),
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
    product: "/products",
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
