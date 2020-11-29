import * as partnerService from "@/services/partner.service";
import * as galleryService from "@/services/gallery.service";
import * as aboutService from "@/services/about.service";
import * as announcementService from "@/services/announcement.service";
import * as notificationService from "@/services/notification.service";

export default {
    namespaced: true,
    state: {
        gallery: [],
        partners: [],
        aboutUs: {},
        announcements: [],
        messagesData: "",
        unseenMessages: "",
    },
    actions: {
        addGalleryImage({commit}, data) {
            return galleryService
                .addGalleryImage(data)
                .then((image) => {
                    commit('addNewGalleryImage',image.data);
                    return "";
                })
                .catch(() => {
                    throw new Error("Failed");
                });
        },
        getGalleryImages({ commit }) {
            return galleryService.getGalleryImages().then((data) => {
                commit("getGallerySuccess", data.data);
                if (data.data.length == 0) return "empty";
            });
        },
        updateImageTitle({ commit }, data) {
            return galleryService
                .updateImageTitle(data)
                .then((gallery) => {
                    commit("updateImageTitleSuccess", { gallery: gallery.data, index: data.index });
                    return "";
                })
                .catch(() => {
                    throw new Error("Failed");
                });
        },
        deleteGalleryImage({ commit }, data) {
            return galleryService
                .deleteGalleryImage(data.id)
                .then(() => {
                    commit("deleteImageSuccessfull", data.index);
                    return "";
                })
                .catch(() => {
                    throw new Error("Failed");
                });
        },
        addPartners({ commit }, data) {
            return partnerService
                .addPartners(data)
                .then((partner) => {
                    commit("addNewPartner", partner.data);
                    return "";
                })
                .catch(() => {
                    throw new Error("Failed");
                });
        },
        getPartners({ commit }) {
            return partnerService.getPartners().then((data) => {
                commit("getPartnersSuccess", data.data);
                if (data.data.length == 0) return "empty";
            });
        },
        updatePartner({ commit }, data) {
            return partnerService
                .updatePartner(data)
                .then((partner) => {
                    commit("updatePartnerSuccess", { partner: partner.data, index: data.index });
                    return "";
                })
                .catch(() => {
                    throw new Error("Failed");
                });
        },
        deletePartner({ commit }, data) {
            return partnerService
                .deletePartner(data.id)
                .then(() => {
                    commit("deletePartnerSuccessfull", data.index);
                    return "";
                })
                .catch(() => {
                    throw new Error("Failed");
                });
        },
        addAbout(_, data) {
            return aboutService
                .addAbout(data)
                .then(() => {
                    return "";
                })
                .catch(() => {
                    throw new Error("Failed");
                });
        },
        getAbout({ commit }) {
            return aboutService.getAbout().then((data) => {
                commit("getAboutSuccess", data.data);
                return data;
            });
        },
        getAllAnnouncements({ commit }) {
            return announcementService.getAllAnnouncements().then((data) => {
                commit("onAnnouncementsFetched", data.data);
            });
        },
        addAnnouncement({ commit }, data) {
            return announcementService.addAnnouncement(data).then((data) => {
                commit("onAnnouncementAdded", data.data);
            });
        },
        updateAnnouncement({ commit }, data) {
            return announcementService.updateAnnouncement(data).then((data) => {
                commit("onAnnouncementUpdated", data.data);
            });
        },
        deleteAnnouncement({ commit }, data) {
            return announcementService.deleteAnnouncement(data).then(() => {
                commit("onAnnouncementDeleted", data);
            });
        },
        getMessages({ commit }, data) {
            notificationService
                .getNotification(data)
                .then((messages) => {
                    commit("getMessagesSuccess", messages.data);
                    return "";
                })
                .catch((err) => {
                    throw new Error(err);
                });
        },
        getUnseen({ commit }) {
            notificationService
                .getUnseen()
                .then((totalUnseen) => {
                    commit("getSeenSuccess", totalUnseen.data);
                })
                .catch((err) => {
                    throw new Error(err);
                });
        },
        updateMessageStatus({ commit }, data) {
            notificationService
                .updateNotificationStatus({ id: data.id })
                .then(() => {
                    commit("updateMessageStatusSuccess", data.index);
                    return "";
                })
                .catch((err) => {
                    throw new Error(err);
                });
        },
        deleteNotification({ commit }, data) {
            notificationService
                .deleteNotification({ id: data.id })
                .then(() => {
                    commit("deleteNotificationSuccess", data.index);
                    return "";
                })
                .catch((err) => {
                    throw new Error(err);
                });
        },
    },
    mutations: {
        getGallerySuccess(state, data) {
            this._vm.$set(state, "gallery", data);
        },
        addNewGalleryImage(state, data) {
            state.gallery.push(data);
        },
        deleteImageSuccessfull(state, index) {
            state.gallery.splice(index, 1);
        },
        updateImageTitleSuccess(state, data) {
            state.gallery.splice(data.index, 1, data.gallery);
        },
        getPartnersSuccess(state, data) {
            this._vm.$set(state, "partners", data);
        },
        deletePartnerSuccessfull(state, index) {
            state.partners.splice(index, 1);
        },
        updatePartnerSuccess(state, data) {
            state.partners.splice(data.index, 1, data.partner);
        },
        addNewPartner(state, data) {
            state.partners.push(data);
        },
        getAboutSuccess(state, data) {
            this._vm.$set(state, "aboutUs", data);
        },
        onAnnouncementsFetched(state, data) {
            state.announcements = data;
        },
        onAnnouncementAdded(state, data) {
            state.announcements.push(data);
        },
        onAnnouncementUpdated(state, data) {
            const foundIndex = state.announcements.findIndex((obj) => obj._id === data._id);
            state.announcements[foundIndex] = data;
        },
        onAnnouncementDeleted(state, data) {
            const foundIndex = state.announcements.findIndex((obj) => obj._id === data.id);
            state.announcements.splice(foundIndex, 1);
        },
        getMessagesSuccess(state, data) {
            this._vm.$set(state, "messagesData", data);
        },
        getSeenSuccess(state, data) {
            this._vm.$set(state, "unseenMessages", data);
        },
        updateMessageStatusSuccess(state, index) {
            state.messagesData.messages[index].seen = true;
        },
        deleteNotificationSuccess(state, index) {
            state.messagesData.messages.splice(index, 1);
        },
    },
};
