const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter name"]
    },
    email: {
        type: String,
        required: [true, "Please enter Email"],
        unique: true,
        trim: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please enter a valid email"
        ],
    },
    password: {
        type: String,
        required: [true, "Please enter Password"]
    },
    photo: {
        type: String,
        required: [true, "Please add a photo"],
        default: "https://i.ibb.co/4pDNDk1/avatar.png"
    },
    phone: {
        type: String,
        default: "+98",
    },
    bio: {
        type: String,
        default: "bio"
    },
    role: {
        type: String,
        required: true,
        default: "Subscriber"
        // subscriber, author, and admin (suspended)
    },
    isVerified: {
        type: Boolean,
        required: false,
    },
    userAgent: {
        type: Array,
        required: true,
        default: []
    }
}, {
    timestamps: true,
    minimize: false
});


const User = mongoose.model("User", userSchema);
module.exports = User;


// --------------------------------------


// In the code you provided, “timestamps” is an option that tells Mongoose to automatically manage createdAt
// and updatedAt properties on your documents. This option adds createdAt and updatedAt properties that are timestamped
// with a Date, and which does all the work for you.

// “minimize” is another option that tells Mongoose whether to remove empty objects from arrays when saving to MongoDB.
// If set to false, empty objects will be saved2.