import { Router } from "express";
import galleryModel from "../models/gallery";
import { authenticate } from "../utils/jwt";
import * as fs from "fs";
import { v4 as uuidv4 } from "uuid";

const router = Router();

const imageDirectory = __dirname.replace("controllers", "images");

const saveImage = (b64: string, format: string) => {
    const fileName = uuidv4() + `.${format}`;
    fs.writeFile(`${imageDirectory}/${fileName}`, b64, { encoding: "base64" }, err => {
        if (err) throw Error(err.toString());
    });
    return fileName;
};

const deleteImage = (fileName: string) => {
    fs.unlink(`${imageDirectory}/${fileName}`, err => {
        if (err) throw Error(err.toString());
    });
};

router.post("/", authenticate, async (req, res) => {
    try {
        const { imageB64: image, format, title } = req.body;

        const savedFileName = saveImage(image, format);

        const newImage = new galleryModel({
            title,
            imageUri: savedFileName,
        });
        const addedImage = await newImage.save();

        return res.status(200).json(addedImage);
    } catch (error) {
        console.log(error);
        return res.status(500).send();
    }
});

router.patch("/", authenticate, async (req, res) => {
    try {
        const { title, id } = req.body;

        let gallery: any = await galleryModel.findById(id);

        gallery.title = title;

        await gallery.save();

        return res.status(200).json(gallery);
    } catch (error) {
        console.log(error);
        return res.status(500).send();
    }
});

router.get("/", async (_, res) => {
    try {
        const images = await galleryModel.find({});

        return res.status(200).json(images);
    } catch (error) {
        console.log(error);
        return res.status(500).send();
    }
});

router.get("/limit", async (_, res) => {
    try {
        await galleryModel
            .find({})
            .sort({ createdAt: -1 })
            .limit(5)
            .exec(function (err, posts) {
                if (err) return res.status(500).send();

                return res.status(200).json(posts);
            });
    } catch (error) {
        console.log(error);
        return res.status(500).send();
    }
});

router.delete("/:id", authenticate, async (req, res) => {
    try {
        const { id } = req.params;

        const deletedEntry: any = await galleryModel.findByIdAndDelete(id);
        deleteImage(deletedEntry.imageUri);

        return res.status(204).send();
    } catch (error) {
        console.log(error);
        return res.status(500).send();
    }
});

export default router;
