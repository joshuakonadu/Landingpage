const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");

const app = express();
const port: number = 5000;

require("./config/db");

app.use(bodyParser.urlencoded({ limit: "500mb", extended: true }));
app.use(bodyParser.json({ limit: "500mb" }));
app.use(cors());
app.options("*", cors());

fs.readdirSync(path.join(__dirname, "routes")).map(file => {
    require("./routes/" + file)(app);
});

app.use(function (req, res) {
    res.status(404).send({ url: req.originalUrl + " not found" });
});

const server = app.listen(port);

server.timeout = 440000;
console.log("RESTful API server landingpage-VueBackend started on: " + port);

module.exports.app = app;

process.on("SIGINT", function () {
    server.close(function (err) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        process.exit(0);
    });
});
