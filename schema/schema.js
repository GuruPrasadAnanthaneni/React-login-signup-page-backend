const mongoose = require("mongoose");

const Schema = new mongoose.Schema(
    {
        name: {type: String, required: true},
        email: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        verified: { type:Boolean, default: true},
    },
    {
        collection: "User-Data",
    }
);
module.exports = mongoose.model("User-Data", Schema);