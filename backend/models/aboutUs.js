const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const db = require("../config/db");

const aboutSchema = new Schema(
    {
        title: { type: String, default: "" },
        image: {
            imageB64: { type: String, default: "" },
            format: { type: String, default: "jpeg" },
        },
        description: { type: String, default: "" },
    },
    { collection: "aboutpost" }
);

aboutSchema.set("autoIndex", false);

export default db.model("AboutUs", aboutSchema);
