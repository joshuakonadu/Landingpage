const jwt = require("jsonwebtoken");
import { Router } from "express";

const router = Router();

router.post("/", async (req, res) => {
    try {
        const { password } = req.body;

        if (password != "abcdefg") return res.status(403).send(); //password später in env festlegen

        const user = {
            username: "admin",
        };
        const token = await jwt.sign({ username: user.username }, "secretKey"); //key später in env festlegen

        return res.status(200).json(token);
    } catch (error) {
        console.log(error);
        return res.status(500).send();
    }
});

export default router;
