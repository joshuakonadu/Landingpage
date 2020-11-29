import { Router } from "express";
import partnerModel from "../models/partner";
import { authenticate } from "../utils/jwt";

const router = Router();

router.post("/", authenticate, async (req, res) => {
    try {
        const { imageB64: image, format, title, uri } = req.body;

        const newPartner = new partnerModel({
            title,
            image: { format, imageB64: image },
            uri,
        });
        const addedPartner = await newPartner.save();

        return res.status(200).json(addedPartner);
    } catch (error) {
        console.log(error);
        return res.status(500).send();
    }
});

router.patch("/", authenticate, async (req, res) => {
    try {
        const { imageB64: image, format, title, uri, id } = req.body;

        let partner: any = await partnerModel.findById(id);

        partner.title = title;
        partner.uri = uri;
        partner.image = { format, imageB64: image };

        await partner.save();

        return res.status(200).json(partner);
    } catch (error) {
        console.log(error);
        return res.status(500).send();
    }
});

router.get("/", async (_, res) => {
    try {
        const partners = await partnerModel.find({});

        // if (partners.length === 0) return res.status(404).send();

        return res.status(200).json(partners);
    } catch (error) {
        console.log(error);
        return res.status(500).send();
    }
});

router.delete("/:id", authenticate, async (req, res) => {
    try {
        const { id } = req.params;

        await partnerModel.findByIdAndDelete(id);

        return res.status(204).send();
    } catch (error) {
        console.log(error);
        return res.status(500).send();
    }
});

export default router;
