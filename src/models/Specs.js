const mongoose = require("mongoose");

const specSchema = mongoose.Schema({
    brand: {
        type: String,
    },
    brand_slug: {
        type: String,
    },
    phone_name: {
        type: String,
    },
    phone_name_slug: {
        type: String,
    },
    phone_img_url: {
        type: String,
    },
    specifications: {
        type: Array,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("specs", specSchema);