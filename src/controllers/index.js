const { json } = require("../utils/response");

exports.index = (req, res) => {
    const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    return json(res, {
        list_brands: {
            endpoint: '/brands',
            example: fullUrl+'brands'
        },
        list_phones: {
            endpoint: '/brands/{brand_slug}',
            example: fullUrl+'brands/samsung'
        },
        phone_specs: {
            endpoint: '/brands/{brand_slug}/{phone_slug}',
            example: fullUrl+'brands/samsung/galaxy-note20-ultra-5g'
        },
        search: {
            endpoint: '/search',
            example: fullUrl+'search?query=Galaxy Note'
        },
        scrape: {
            endpoint: '/scrape',
            example: fullUrl+'scrape?url=https://www.gsmarena.com/samsung_galaxy_tab_s7+-10336.php'
        }
    })
}
