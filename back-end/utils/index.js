const jwt = require("jsonwebtoken");
const crypto = require('crypto');

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET);
};

const generateRefreshToken = ({refreshToken, userId}) => {
    return jwt.sign({refreshToken, userId}, process.env.JWT_SECRET, {expiresIn: "1d"});
};

// Hash Token ---> hashing tokens before it saves to the database.
const hashToken = (token) => {
    return crypto.createHash("sha256").update(token.toString()).digest("hex");
};

module.exports = {generateToken, generateRefreshToken, hashToken};
