const asyncHandler = require("express-async-handler");
const User = require('../models/userModel');
const {generateToken, hashToken} = require("../utils");
const bcrypt = require('bcryptjs');
const parser = require('ua-parser-js');
const jwt = require('jsonwebtoken');
const sendEmail = require("../utils/sendEmail");
const Token = require("../models/tokenModel");
const crypto = require('crypto');
const Cryptr = require('cryptr');

const cryptr = new Cryptr(process.env.CRYPTR_KEY);

// ------------ Register User
const registerUser = asyncHandler(async (req, res) => {
    const {name, email, password} = req.body;

    // validation
    if (!name || !email || !password) {
        res.status(400);
        throw new Error('Please fill in all required fields.');
    }
    if (password.length < 8) {
        res.status(400);
        throw new Error('Password must be at least 8 characters!');
    }

    // Check if user exists
    const userExists = await User.findOne({email});
    if (userExists) {
        res.status(400);
        throw new Error('This email already in use');
    }

    // Get UserAgent
    const ua = parser(req.headers['user-agent']);
    const userAgent = [ua.ua];

    // Create new user
    const user = await User.create({name, email, password, userAgent});

    // Generate Token
    const token = generateToken(user._id);

    // Send HTTP-only Cookie
    res.cookie("token", token, {
        path: '/',
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 86400), // 1 day
        sameSite: 'none',
        secure: true
    });

    if (user) {
        const {_id, name, email, phone, bio, photo, role, isVerified} = user;
        res.status(201).json({_id, name, email, phone, bio, photo, role, isVerified, token});
    } else {
        res.status(400);
        throw new Error("Invalid user data");
    }
});
// ---> After Register here Function: sendVerificationEmail()
// ---> After sendVerificationEmail() : verifyUser()

// ------------ Login User
const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body;

    // Validation
    if (!email || !password) {
        res.status(400);
        throw new Error('Please fill in all required fields.');
    }

    const user = await User.findOne({email});
    if (!user) {
        res.status(404);
        throw new Error("User not found, Please signup");
    }

    const passwordIsCorrect = await bcrypt.compare(password, user.password);
    if (!passwordIsCorrect) {
        res.status(400);
        throw new Error("Invalid email or password");
    }

    // ---> Trigger 2-Factor unknown UserAgent [69]
    const ua = parser(req.headers["user-agent"]);
    const thisUserAgent = ua.ua;
    console.log(thisUserAgent);
    const allowedAgent = user.userAgent.includes(thisUserAgent);

    if (!allowedAgent) {
        // Generate 6 digit code
        const loginCode = Math.floor(100000 + Math.random() * 900000);
        console.log(loginCode);
        // Math.floor(Math.random() * (max - min)) + min;

        // Encrypt login code before saving to DB
        const encryptedLoginCode = cryptr.encrypt(loginCode.toString());

        // Delete Token if it exists in DB [69]
        let userToken = await Token.findOne({userId: user._id}); // Token is from tokenModel.js file
        if (userToken) await userToken.deleteOne();

        // Save Token to DB
        await new Token({
            userId: user._id,
            loginToken: encryptedLoginCode,
            createdAt: Date.now(),
            expiresAt: Date.now() + 60 * (60 * 1000) // 60-Min(1-hour)
        }).save();

        res.status(400);
        throw new Error("New browser or device detected.");
    }


    // Generate Token
    const token = generateToken(user._id);

    if (user && passwordIsCorrect) {
        // Send HTTP-only Cookie
        res.cookie("token", token, {
            path: '/',
            httpOnly: true,
            expires: new Date(Date.now() + 1000 * 86400), // 1 day
            sameSite: 'none',
            secure: true
        });
        const {_id, name, email, phone, bio, photo, role, isVerified} = user;
        res.status(200).json({_id, name, email, phone, bio, photo, role, isVerified, token});
    } else {
        res.status(500);
        throw new Error("Something went wrong, please try again!");
    }
});

// ------------ Logout User
const logoutUser = asyncHandler(async (req, res) => {
    res.cookie("token", '', {
        path: '/',
        httpOnly: true,
        expires: new Date(0),
        sameSite: 'none',
        secure: true
    });

    return res.status(200).json({message: "Logout successful"});
});

// ------------ Get User
const getUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        const {_id, name, email, phone, bio, photo, role, isVerified} = user;
        res.status(200).json({_id, name, email, phone, bio, photo, role, isVerified});
    } else {
        res.status(404);
        throw new Error("User not found");
    }
});

// ------------ Update User
const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        const {name, email, phone, bio, photo} = user;
        user.email = email;
        user.name = req.body.name || name;
        user.phone = req.body.phone || phone;
        user.bio = req.body.bio || bio;
        user.photo = req.body.photo || photo;
        const updatedUser = await user.save(); //                   <----
        // save() will create a new document in the database or update an existing document.

        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            phone: updatedUser.phone,
            bio: updatedUser.bio,
            photo: updatedUser.photo,
            role: updatedUser.role,
            isVerified: updatedUser.isVerified
        });
    } else {
        res.status(404);
        throw new Error("User not found");
    }
});

// ------------ Delete User
const deleteUser = asyncHandler(async (req, res) => {
    const user = User.findById(req.params.id);

    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }

    await user.deleteOne(); // .remove() not work
    res.status(200).json({message: "User deleted successfully"});
});

// ------------ Get All Users
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find().sort("-createdAt").select("-password"); // Except Password
    // The minus sign [-createdAt] is used to sort the documents in reverse order (i.e., from newest to oldest)
    if (!users) {
        res.status(500);
        throw new Error("Something went wrong");
    }
    res.status(200).json(users);
});

// ------------ Get Login Status --> function with boolean result
const loginStatus = asyncHandler(async (req, res) => {
    const token = req.cookies.token;
    if (!token) return res.json(false);

    // Verify token
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (verified) return res.json(true);
});

// ------------ Upgrade User Role
const upgradeUser = asyncHandler(async (req, res) => {
    const {id, role} = req.body; // we can access user properties because we set user as a key in authMiddleware.
    // console.log(id); // shows ID like this: 64b3e4a5575ba351211872ac
    const user = await User.findById(id);
    if (!user) {
        res.status(404);
        throw new Error('User not found!');
    }
    user.role = role;
    await user.save();

    res.status(200).json({massage: `User role updated to ${role}`});
});

// ------------ Send Automated Emails
const sendAutomatedEmail = asyncHandler(async (req, res) => {
    const {subject, send_to, reply_to, template, url} = req.body;

    if (!subject || !send_to || !reply_to || !template) {
        res.status(500);
        throw new Error(("Missing email parameter"));
    }

    // Get user
    const user = await User.findOne({email: send_to});

    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }
    const sent_from = process.env.EMAIL_USER;
    const name = user.name;
    const link = `${process.env.FRONTEND_URL}${url}`; // Frontend URL: http://localhost:3000

    try {
        await sendEmail(subject, send_to, sent_from, reply_to, template, name, link);
        res.status(200).json({massage: "Email Sent"});
    } catch (error) {
        res.status(500);
        throw new Error("Email not sent, please try again");
    }
});

// ------------ Send Verification Email
const sendVerificationEmail = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (!user) {
        res.status(404);
        throw new Error("User not found!");
    }

    if (user.isVerified) {
        res.status(400);
        throw new Error("User already verified");
    }

    // Delete Token if it exists in DB
    let token = await Token.findOne({userId: user._id}); // Token is from tokenModel.js file
    if (token) await token.deleteOne();

    // Create Verification Token and Save to DB
    const verificationToken = crypto.randomBytes(32).toString("hex") + user._id;
    console.log(verificationToken);

    // Hash Token and Save to DB
    const hashedToken = hashToken(verificationToken);

    await new Token({
        userId: user._id,
        verificationToken: hashedToken,
        createdAt: Date.now(),
        expiresAt: Date.now() + 60 * (60 * 1000) // 60-Min(1-hour)
    }).save();

    // Construct Verification URL ---> Sending for User
    const verificationUrl = `${process.env.FRONTEND_URL}/verify/${verificationToken}`;

    // Send Verification Email
    const subject = "Verify Your Account - AUTH:REZA";
    const send_to = user.email;
    const sent_from = process.env.EMAIL_USER;
    const reply_to = "noreply@rezapshr.com";
    const template = "verifyEmail";
    const name = user.name;
    const link = verificationUrl;

    try {
        await sendEmail(subject, send_to, sent_from, reply_to, template, name, link);
        res.status(200).json({message: "Verification Email Sent"});
    } catch (error) {
        res.status(500);
        throw new Error("Email not sent, please try again");
    }
});

// ------------ Verify User
const verifyUser = asyncHandler(async (req, res) => {
    const {verificationToken} = req.params;

    const hashedToken = hashToken(verificationToken);
    // console.log(hashedToken);

    const userToken = await Token.findOne({
        verificationToken: hashedToken,
        expiresAt: {$gt: Date.now()}
    });

    if (!userToken) {
        res.status(404);
        throw new Error("Invalid or Expired Token");
    }

    // Find User
    const user = await User.findOne({_id: userToken.userId});

    if (user.isVerified) {
        res.status(400);
        throw new Error("User is already verified");
    }

    // Now Verify User
    user.isVerified = true;
    await user.save();

    res.status(200).json({message: "Account verification was successful"});
});

// ------------ Forgot Password
const forgotPassword = asyncHandler(async (req, res) => {
    const {email} = req.body;

    const user = await User.findOne({email});

    if (!user) {
        res.status(404);
        throw new Error("There is no user with this email");
    }

    // Delete Token if it exists in DB
    let token = await Token.findOne({userId: user._id}); // Token is from tokenModel.js file
    if (token) await token.deleteOne();

    // Create Verification Token and Save to DB
    const resetToken = crypto.randomBytes(32).toString("hex") + user._id;
    console.log(resetToken);

    // Hash Token and Save to DB
    const hashedToken = hashToken(resetToken);

    await new Token({
        userId: user._id,
        resetToken: hashedToken,
        createdAt: Date.now(),
        expiresAt: Date.now() + 60 * (60 * 1000) // 60-Min(1-hour)
    }).save();

    // Construct Reset URL ---> Sending for User
    const resetUrl = `${process.env.FRONTEND_URL}/resetPassword/${resetToken}`;

    // Send Verification Email
    const subject = "Password Reset Request - AUTH:REZA";
    const send_to = user.email;
    const sent_from = process.env.EMAIL_USER;
    const reply_to = "rezanoreply@rezapshr.com";
    const template = "forgotPassword";
    const name = user.name;
    const link = resetUrl;

    try {
        await sendEmail(subject, send_to, sent_from, reply_to, template, name, link);
        res.status(200).json({message: "Password Reset Email Sent"});
    } catch (error) {
        res.status(500);
        throw new Error("Email not sent, please try again");
    }
});

// ------------ Reset Password
const resetPassword = asyncHandler(async (req, res) => {
    const {resetToken} = req.params;
    const {password} = req.body;

    const hashedToken = hashToken(resetToken);

    const userToken = await Token.findOne({
        resetToken: hashedToken,
        expiresAt: {$gt: Date.now()}
    });

    if (!userToken) {
        res.status(404);
        throw new Error("Invalid or Expired Token");
    }

    // Find User
    const user = await User.findOne({_id: userToken.userId});

    // Now Reset Password
    user.password = password;
    await user.save();

    res.status(200).json({message: "Password reset was successful, Please login"});
});

// ------------ Change Password
const changePassword = asyncHandler(async (req, res) => {
    const {oldPassword, password} = req.body;
    const user = await User.findById(req.user._id);

    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }

    if (!oldPassword || !password) {
        res.status(400);
        throw new Error("Please enter old and new password");
    }

    // Check if old password is correct
    const passwordIsCorrect = await bcrypt.compare(oldPassword, user.password);

    // Save New Password
    if (user && passwordIsCorrect) {
        user.password = password;
        await user.save();
        res.status(200).json({message: "Password changed successfully, please login again."});
    } else {
        res.status(400);
        throw new Error("Old password is incorrect");
    }
});

// ------------ Send Login Code
const sendLoginCode = asyncHandler(async (req, res) => {
    const {email} = req.params;
    const user = await User.findOne({email});

    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }
    // console.log(user._id); ---> new ObjectId("64b3e4a5575ba351211872ac")

    // Find Login Code in DB
    let userToken = await Token.findOne({
        userId: user._id,
        expiresAt: {$gt: Date.now()}
    });
    // console.log(userToken);

    if (!userToken) {
        res.status(404);
        throw new Error("Invalid or Expired Token, please login again");
    }

    const loginCode = userToken.loginToken;
    const decryptedLoginCode = cryptr.decrypt(loginCode);

    // Send Login Code
    const subject = "Login Access Code - AUTH:REZA";
    const send_to = email;
    const sent_from = process.env.EMAIL_USER;
    const reply_to = "rezanoreply@rezapshr.com";
    const template = "loginCode";
    const name = user.name;
    const link = decryptedLoginCode;

    try {
        await sendEmail(subject, send_to, sent_from, reply_to, template, name, link);
        res.status(200).json({massage: `Access code sent to ${email}`});
    } catch (error) {
        res.status(500);
        throw new Error("Email not sent, please try again");
    }
});

// ------------ Login With Code ---> login with 6-digit access code that user enter.
const loginWithCode = asyncHandler(async (req, res) => {
    const {email} = req.params;
    const {loginCode} = req.body;

    const user = await User.findOne({email});

    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }

    // Find User Login Token
    const userToken = await Token.findOne({
        userId: user._id,
        expiresAt: {$gt: Date.now()}
    });
    // console.log(user._id);

    if (!userToken) {
        res.status(404);
        throw new Error("Invalid or Expired Token, please login again");
    }

    const decryptedLoginCode = cryptr.decrypt(userToken.loginToken);

    if (loginCode !== decryptedLoginCode) {
        res.status(400);
        throw new Error("Incorrect login code, please try again");
    } else {
        // Register User-Agent
        const ua = parser(req.headers["user-agent"]);
        const thisUserAgent = ua.ua;
        user.userAgent.push(thisUserAgent);
        await user.save();

        // Generate Token
        const token = generateToken(user._id);

        // Send HTTP-only Cookie
        res.cookie("token", token, {
            path: '/',
            httpOnly: true,
            expires: new Date(Date.now() + 1000 * 86400), // 1 day
            sameSite: 'none',
            secure: true
        });

        const {_id, name, email, phone, bio, photo, role, isVerified} = user;
        res.status(201).json({_id, name, email, phone, bio, photo, role, isVerified, token});
    }
});


module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    getUser,
    updateUser,
    deleteUser,
    getUsers,
    loginStatus,
    upgradeUser,
    sendAutomatedEmail,
    sendVerificationEmail,
    verifyUser,
    forgotPassword,
    resetPassword,
    changePassword,
    sendLoginCode,
    loginWithCode
};