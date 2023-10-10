const mongoose = require("mongoose")

const PropertySchema = new mongoose.Schema({
    currentOwner: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    title: {
        type: String,
        required: true,
        min: 6,
    },
    type: {
        type: String,
        enum: ["Builder", "Society", "House"],
        required: true
    },
    desc: {
        type: String,
        required: true,
        min: 50,
    },
    image: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    sqmeters: {
        type: Number,
        required: true,
        min: 15
    },
    // Area: {
    //     type: String,
    //     required: true
    // },
    // beds: {
    //     type: Number,
    //     required: true,
    //     min: 1
    // },
    // bookmarkedUsers: {
    //     type: [String],
    //     default: []
    // }
}, {timestamps: true})

module.exports = mongoose.model("Property", PropertySchema)