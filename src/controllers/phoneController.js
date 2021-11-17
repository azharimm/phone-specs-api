const Brand = require("../models/Brand");
const Specs = require("../models/Specs");
const { json, errorJson } = require("../utils/response");

exports.index = async (req, res) => {
    try {
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;
        const skip = (page - 1) * limit;
        const order = req.query.sort || 'brand:asc';
        const search = req.query.search ? {brand: {$regex: req.query.search, $options: 'i'}} : {};
        const field = order.split(':')[0];
        const sort = order.split(':')[1] === 'asc' ? 1 : -1;
        
        const total = await Brand.find().countDocuments();
        const brands = await Brand.find(search)
            .skip(skip)
            .limit(parseInt(limit))
            .sort([[field, sort]])
            .exec();

        return json(res, {
            page: parseInt(page),
            limit: parseInt(limit),
            last_page: Math.ceil(total / limit),
            brands,
        });
    } catch (error) {
        return errorJson(res, error);
    }
};

exports.show = async (req, res) => {
    try {
        const brand_slug = req.params.brand_slug;
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;
        const skip = (page - 1) * limit;
        const order = req.query.sort || 'brand:asc';
        const field = order.split(':')[0];
        const sort = order.split(':')[1] === 'asc' ? 1 : -1;
  
        const total = await Specs.find({ brand_slug }).countDocuments();
        const brands = await Specs.find({ brand_slug })
            .skip(skip)
            .limit(parseInt(limit))
            .sort([[field, sort]])
            .exec();

        if(total === 0) {
            return errorJson(res, `Brand not found`, 404);
        }


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

exports.specs = async (req, res) => {
    try {
        const brand_slug = req.params.brand_slug;
        const phone_name_slug = req.params.phone_name_slug;
        const data = await Specs.findOne({ brand_slug, phone_name_slug }).exec();
        if(!data) {
            return errorJson(res, `Phone not found`, 404);
        }
        return json(res, {
            brand: data.brand.trim(),
            phone_name: data.phone_name,
            phone_name_slug: data.phone_name_slug,
            phone_img_url: data.phone_img_url,
            specifications: data.specifications,
            created_at: data.created_at
        });
    } catch (error) {
        return errorJson(res, error);
    }
};
