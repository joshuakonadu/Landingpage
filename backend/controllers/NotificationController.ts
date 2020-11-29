import { Router } from "express";
import notificationModel from "../models/notification";
import { authenticate } from "../utils/jwt";

const router = Router();

router.post("/", async (req, res) => {
    try {
        const email = req.body.email;
        const name = req.body.name;
        const message = req.body.message;
        const phone = req.body.phone;
        const trap = req.body.subject;

        let formattedName = name.split(" ");

        for (let i = 0; i < formattedName.length; i++) {
            formattedName[i] = formattedName[i][0].toUpperCase() + formattedName[i].substr(1);
        }
        formattedName = formattedName.join(" ");

        if (trap) {
            //Vorkehrung gegen bots
            res.writeHead(302, { Location: "https://google.com" });
            res.end();
        }

        const newNotification = new notificationModel({
            name: formattedName,
            email,
            phone,
            message,
        });

        await newNotification.save();
        return res.status(200).send(); //todo return entfernen und nodemailer function integrieren
    } catch (error) {
        console.log(error);
        return res.status(500).send();
    }
});

router.get("/unseen", authenticate, async (req, res) => {
    try {
        var query = { seen: false };
        notificationModel.countDocuments(query).exec((count_error, count) => {
            if (count_error) {
                return res.json(count_error);
            }
            return res.json(count);
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send();
    }
});

router.get("/:page", authenticate, async (req, res) => {
    try {
        const page = parseInt(req.params.page);
        const limit = 10;
        const skip = (page - 1) * limit;
        var query = {};
        notificationModel
            .find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .exec((err, doc) => {
                if (err) {
                    return res.json(err);
                }
                notificationModel.countDocuments(query).exec((count_error, count) => {
                    if (err) {
                        return res.json(count_error);
                    }
                    return res.json({
                        total: count,
                        page: page,
                        pageSize: doc.length,
                        pages: Math.ceil(count / limit) || 1,
                        messages: doc,
                    });
                });
            });
    } catch (error) {
        console.log(error);
        return res.status(500).send();
    }
});

router.patch("/", authenticate, async (req, res) => {
    try {
        const id = req.body.id;

        const message: any = await notificationModel.findById(id);
        message.seen = true;
        await message.save();

        return res.status(200).send();
    } catch (error) {
        console.log(error);
        return res.status(500).send();
    }
});

router.delete("/:id", authenticate, async (req, res) => {
    try {
        const { id } = req.params;

        await notificationModel.findByIdAndDelete(id);

        return res.status(204).send();
    } catch (error) {
        console.log(error);
        return res.status(500).send();
    }
});

export default router;
