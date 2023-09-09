const mongoose = require('mongoose');


const tokenSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, // this line grapes the id of user.
        required: true,
        ref: "user"
    },
    verificationToken: {
        type: String,
        default: ""
    },
    resetToken: {
        type: String,
        default: ""
    },
    refreshToken: {
        type: String,
        default: ""
    },
    loginToken: { // trigger 2FA
        type: String,
        default: ""
    },
    createdAt: {
        type: Date,
        required: true
    },
    expiresAt: {
        type: Date,
        required: true
    }
});

const Token = mongoose.model("Token", tokenSchema);
module.exports = Token;
