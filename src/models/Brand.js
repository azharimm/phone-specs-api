const mongoose = require("mongoose");

const brandSchema = mongoose.Schema({
    brand_id: {
        type: Number,
    },
    brand: {
        type: String,
        required: true,
    },
    brand_slug: {
        type: String,
    },
    count_devices: {
        type: Number,
    },
    phone_list_url: {
        type: String,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("brands", brandSchema);