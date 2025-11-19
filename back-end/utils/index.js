import jwt from "jsonwebtoken";
import crypto from 'crypto';

export const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET);
};

export const generateRefreshToken = ({refreshToken, userId}) => {
    return jwt.sign({refreshToken, userId}, process.env.JWT_SECRET, {expiresIn: "1d"});
};

// Hash Token ---> hashing tokens before it saves to the database.
export const hashToken = (token) => {
    return crypto.createHash("sha256").update(token.toString()).digest("hex");
};
