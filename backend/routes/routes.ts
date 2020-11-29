import AboutController from "../controllers/AboutController";
import AnnouncementController from "../controllers/AnnouncementController";
import GalleryController from "../controllers/GalleryController";
import NotificationController from "../controllers/NotificationController";
import PartnerController from "../controllers/PartnerController";
import UserController from "../controllers/UserController";

const express = require("express");

const imageDirectory = __dirname.replace("routes", "images");

// Nützlicher Hinweis (für Visual Studio Code) strg + click auf property (z.B Login) bringt ein direkt zum Code
module.exports = app => {
    app.use("/api/login", UserController);
    app.use("/api/static/images", express.static(imageDirectory));
    app.use("/api/gallery", GalleryController),
    app.use("/api/about", AboutController),
    app.use("/api/partners", PartnerController);
    app.use("/api/notification", NotificationController);
    app.use("/api/announcements", AnnouncementController);
};
