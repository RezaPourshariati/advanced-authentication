const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


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
        default: "subscriber"
        // subscriber, author, and admin (suspended)
    },
    isVerified: {
        type: Boolean,
        required: true,
        default: false
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


// Encrypt Password Before Saving to Database:
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    // Hash password:
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt); // hashed password
    next();
})

// pre: for execute the function before saving to database!

// NOTE: If the password has not been modified, the function returns without doing anything.
// This job avoids hashing the password again and again every time the document is saved.


const User = mongoose.model("User", userSchema);
module.exports = User;


// --------------------------------------


// In the code you provided, “timestamps” is an option that tells Mongoose to automatically manage createdAt
// and updatedAt properties on your documents. This option adds createdAt and updatedAt properties that are timestamped
// with a Date, and which does all the work for you.

// “minimize” is another option that tells Mongoose whether to remove empty objects from arrays when saving to MongoDB.
// If set to false, empty objects will be saved.