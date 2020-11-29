import { Router } from "express";
import AnnouncementModel from "../models/announcement";
import { authenticate } from "../utils/jwt";

const router = Router();

router.post("/", authenticate, async (req, res) => {
    try {
        const { image, title, description } = req.body;
        const newAnnouncement = new AnnouncementModel({ image, title, description });
        const addedAnnouncement = await newAnnouncement.save();

        return res.status(200).json(addedAnnouncement);
    } catch (error) {
        console.log(error);
        return res.status(500).send();
    }
});

router.patch("/", authenticate, async (req, res) => {
    try {
        const { id, image, title, description } = req.body;
        const existingAnnouncement: any = await AnnouncementModel.findById(id);
        existingAnnouncement.title = title;
        existingAnnouncement.image = image;
        existingAnnouncement.description = description;

        const addedAnnouncement = existingAnnouncement.save();

        return res.status(200).json(addedAnnouncement);
    } catch (error) {
        console.log(error);
        return res.status(500).send();
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        await AnnouncementModel.findByIdAndDelete(id);

        return res.status(204).send();
    } catch (error) {
        console.log(error);
        return res.status(500).send();
    }
});

router.get("/latest", async (_, res) => {
    try {
        // @ts-ignore
        const announcement = await AnnouncementModel.findOne({}, {}, { sort: { created_at: -1 } });

        return res.status(200).json(announcement);
    } catch (error) {
        console.log(error);
        return res.status(500).send();
    }
});

router.get("/", async (_, res) => {
    try {
        const announcements = await AnnouncementModel.find();

        return res.status(200).json(announcements);
    } catch (error) {
        console.log(error);
        return res.status(500).send();
    }
});

export default router;
