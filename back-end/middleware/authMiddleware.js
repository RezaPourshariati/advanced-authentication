const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const Token = require("../models/tokenModel");
const {generateToken} = require("../utils");


const protect = asyncHandler(async (req, res, next) => {
    try {
        const {accessToken, refreshToken} = req.cookies;
        // const accessToken = req.cookies.accessToken;
        console.log("Current AccessToken:  ", accessToken);
        console.log("Current RefreshToken:  ", refreshToken);

        if (accessToken) {
            // Verify token
            const verified = jwt.verify(accessToken, process.env.JWT_SECRET);
            // (accessToken) verified output: { id: '64a99b4e6cafb82861f3791e', iat: 1689142953, exp: 1689229353 }

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
            return next();
        }
        if (!accessToken) {
            const verified = jwt.verify(refreshToken, process.env.JWT_SECRET);
            console.log(verified);
            // (refreshToken) verified output:
            // {
            //     "refreshToken": "479aab459cc220ac46bc1bdfaed918e3dbf1ded145ed4cab1afcd8783244197864b3e4a5575ba351211872ac",
            //     "userId": "64b3e4a5575ba351211872ac",
            //     "iat": 1693866127,
            //     "exp": 1693952527
            // }

            const userToken = await Token.findOne({
                userId: verified.userId,
                refreshToken: verified.refreshToken
            });
            console.log(userToken);

            if (!userToken) { // we could set the isValid --> !userToken?.isValid
                res.status(401);
                throw new Error("Not authorized, please login");
            }
            const newAccessToken = await generateToken(userToken.userId);
            console.log("New accessToken:    ", newAccessToken);

            // Send HTTP-only Cookie
            res.cookie("accessToken", newAccessToken, { // we can add signed: true for adding cookies to signedCookies in req.
                path: '/',
                httpOnly: true,
                expires: new Date(Date.now() + 1000 * 60 * 2), // 2 Minutes
                sameSite: 'none',
                secure: true,
                // maxAge: 1000 * 60
            });
            // res.cookie("refreshToken", refreshToken, {
            //     path: '/',
            //     httpOnly: true,
            //     expires: new Date(Date.now() + 1000 * 86400), // 1 day
            //     sameSite: 'none',
            //     secure: true
            // });

            const user = await User.findById(verified.userId).select("-password");

            // let userRefreshToken = await Token.findOne({userId: verified.userId});
            // if (userRefreshToken) await userRefreshToken.deleteOne();


            // Save Refresh Token to DB
            // await new Token({
            //     userId: verified.userId,
            //     refreshToken: refreshToken,
            //     createdAt: Date.now(),
            //     expiresAt: Date.now() + 1000 * 86400 // 1-Day
            // }).save();

            // if (!user) {
            //     res.status(404);
            //     throw new Error("User not found!");
            // }
            //
            // if (user.role === 'suspended') {
            //     res.status(400);
            //     throw new Error("User suspended, please contact support");
            // }

            req.user = user;
            next();
        }


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
