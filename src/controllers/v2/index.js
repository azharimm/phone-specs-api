const { json } = require("../../utils/response");

exports.index = (req, res) => {
    const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    return json(res, {
        maintainer: 'Azhari Muhammad M <azhari.marzan@gmail.com>',
        source: 'https://github.com/azharimm/phone-specs-api',
        description: 'Phone Specs API v2, Recommended to use',
        list_brands: {
            endpoint: '/v2/brands',
            example: fullUrl+'/brands'
        },
        list_phones: {
            endpoint: '/v2/brands/{brand_slug}',
            example: fullUrl+'/brands/apple-phones-48'
        },
        phone_specs: {
            endpoint: '/v2/{phone_slug}',
            example: fullUrl+'/apple_iphone_12_pro_max-10237'
        },
        search: {
            endpoint: '/v2/search',
            example: fullUrl+'/search?query=Iphone 12 pro max'
        },
        latest: {
            endpoint: '/v2/latest',
            example: fullUrl+'/latest'
        },
        top_by_interest: {
            endpoint: '/v2/top-by-interest',
            example: fullUrl+'/top-by-interest'
        },
        top_by_fans: {
            endpoint: '/v2/top-by-fans',
            example: fullUrl+'/top-by-fans'
        },
    });
}
