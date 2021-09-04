const { json } = require("../utils/response");

exports.index = (req, res) => {
    const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    return json(res, {
        maintainer: 'Azhari Muhammad M <azhari.marzan@gmail.com>',
        source: 'https://github.com/azharimm/phone-specs-api',
        v2: fullUrl+'v2'
    })
}
