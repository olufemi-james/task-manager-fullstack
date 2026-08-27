const mongoose = require("mongoose");

const authSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
        },

        password: {
            type: String,
            required: true,
        },

        passwordResetToken: String,

        passwordResetExpires: Date,
    },
    {
        timestamps: true,
    }
    );

    module.exports = mongoose.model("Auth", authSchema);