const Specs = require("../models/Specs");
const { json, errorJson } = require("../utils/response");

exports.index = async (req, res) => {
    try {
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;
        const skip = (page - 1) * limit;
        const order = req.query.sort || "brand:asc";
        const field = order.split(":")[0];
        const sort = order.split(":")[1] === "asc" ? 1 : -1;
        const search = req.query.query
            ? [
                  { phone_name: { $regex: req.query.query, $options: "i" } },
                  { brand: { $regex: req.query.query, $options: "i" } },
              ]
            : {};

        const total = await Specs.find({ $or: search }).countDocuments();
        const brands = await Specs.find({ $or: search })
            .skip(skip)
            .limit(parseInt(limit))
            .sort([[field, sort]])
            .exec();

        return json(res, {
            page: parseInt(page),
            limit: parseInt(limit),
            last_page: Math.ceil(total / limit),
            phones: brands.map((brand) => {
                return {
                    phone_name: brand.phone_name,
                    phone_name_slug: brand.phone_name_slug,
                    brand: brand.brand,
                    brand_slug: brand.brand_slug,
                    phone_img_url: brand.phone_img_url,
                    created_at: brand.created_at,
                };
            }),
        });
    } catch (error) {
        return errorJson(res, error);
    }
};
