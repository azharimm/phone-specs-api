const Brand = require("../models/Brand");
const { json, errorJson } = require("../utils/response");

exports.index = async (req, res) => {
    try {
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;
        const skip = (page - 1) * limit;
        const total = await Brand.find().countDocuments();
        const brands = await Brand.find({})
            .skip(skip)
            .limit(parseInt(limit))
            .exec();

        return json(res, {
            page: parseInt(page),
            limit: parseInt(limit),
            last_page: Math.ceil(total / limit),
            brands,
        });
    } catch (error) {
        return errorJson(res, `Something went wrong: ${error}`);
    }
};
