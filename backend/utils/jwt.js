const jwt  = require('jsonwebtoken');

function authenticate(req, res, next) {
    //Middleware für authentizierte routen

    let token = req.headers["x-access-token"] || req.headers["authorization"]; // Express headers are auto converted to lowercase
    if (!token) {
        return res.status(403).json({ message: "Auth token is not supplied" });
    }
    if (token.startsWith("Bearer ")) {
        // Remove Bearer from string
        token = token.split(" ")[1];
    } else {
        return res.status(403).json({ message: "Auth token wrong format" });
    }

    jwt.verify(token, "secretKey", async (err, _) => {
        if (err) {
            return res.status(403).json({ message: "Token is not valid" });
        }

        next();
    });
}

module.exports = {
    authenticate,
};
