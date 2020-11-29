import { Router } from "express";
import * as mongoose from "mongoose";
import aboutModel from "../models/aboutUs";
import { authenticate } from "../utils/jwt";

const router = Router();

router.post("/", authenticate, async (req, res) => {
    try {
        const about: any = await aboutModel.findOne();
        const { image, title, description } = req.body;
        if (about == null) {
            const newAbout = new aboutModel({
                title,
                image,
                description,
            });
            const addedAbout = await newAbout.save();

            return res.status(200).json(addedAbout);
        } else {
            about.title = title;
            about.image = image;
            about.description = description;
            const addedAbout = await about.save();

            return res.status(200).json(addedAbout);
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send();
    }
});

router.get("/", async (_, res) => {
    try {
        const about = await aboutModel.findOne();

        // if (about == null) return res.status(404).send();

        return res.status(200).json(about);
    } catch (error) {
        console.log(error);
        return res.status(500).send();
    }
});

export default router;
