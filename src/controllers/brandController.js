const Brand = require("../models/Brand");
const Specs = require("../models/Specs");
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

exports.show = async (req, res) => {
    try {
        const brand_slug = req.params.brand_slug;
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;
        const skip = (page - 1) * limit;
        const total = await Specs.find({ brand_slug }).countDocuments();
        const brands = await Specs.find({ brand_slug })
            .skip(skip)
            .limit(parseInt(limit))
            .exec();

        return json(res, {
            page: parseInt(page),
            limit: parseInt(limit),
            last_page: Math.ceil(total / limit),
            phones: brands.map(brand => {
                return {
                    phone_name: brand.phone_name,
                    phone_name_slug: brand.phone_name_slug,
                    brand: brand.brand,
                    brand_slug: brand.brand_slug,
                    phone_img_url: brand.phone_name,
                    created_at: brand.created_at
                }
            }),
        });
        
    } catch (error) {
        return errorJson(res, `Something went wrong: ${error}`);
    }
}
