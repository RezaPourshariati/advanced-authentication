const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');


const protect = asyncHandler(async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            res.status(401);
            throw new Error("Not authorized, please login");
        }

        // Verify token
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        // verified output: { id: '64a99b4e6cafb82861f3791e', iat: 1689142953, exp: 1689229353 }

        // Get user ID from token
        const user = await User.findById(verified.id).select("-password"); // minus password means except password.

        if (!user) {
            res.status(404);
            throw new Error("User not found!");
        }
        if (user.role === 'suspended') {
            res.status(400);
            throw new Error("User suspended, please contact support");
        }

        req.user = user; // we add to the request a key named user!
        next();

    } catch (error) {
        res.status(401);
        throw new Error("Not authorized, please login");
    }
});

const adminOnly = asyncHandler(async (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(401);
        throw new Error("Not authorized as an admin, You don't allow this action, only admin can access this action");
    }
});

const authorOnly = asyncHandler(async (req, res, next) => {
    if (req.user.role === 'author' || req.user.role === 'admin') {
        next();
    } else {
        res.status(401);
        throw new Error("Not authorized as an author");
    }
});

const verifiedOnly = asyncHandler(async (req, res, next) => {
    if (req.user || req.user.isVerified) {
        next();
    } else {
        res.status(401);
        throw new Error("Not authorized, account not verified");
    }
});

module.exports = {protect, adminOnly, authorOnly, verifiedOnly};


// In JWT, "iat" stands for "issued at" and identifies the time at which the JWT was issued.
// This claim can be used to determine the age of the JWT. Its value must be a number containing a NumericDate value.
// Source: Conversation with Bing, 7/12/2023
