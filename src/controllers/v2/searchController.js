const request = require("request-promise");
const cheerio = require("cheerio");
const { json, errorJson } = require("../../utils/response");

exports.index = async (req, res) => {
    try {
        let q = req.query.query;
        let url;
        if(q === undefined || q === '') {
            return errorJson(res, 'Please provide query search!');
        }else {
            url = `${process.env.BASE_URL}/res.php3?sSearch=${q}`;
        }
        const htmlResult = await request.get(url);
        const $ = await cheerio.load(htmlResult);
        const title = $('.article-info-name').text();
        const phones = [];
        $('.makers').children('ul').children('li').each((index, el) => {
            const slug = $(el).children('a').attr('href').replace('.php','');
            const image = $(el).find('img').attr('src');
            const phone_name = $(el).children('a').find('br').get(0).nextSibling.nodeValue
            const brand = $(el).children('a').text().replace(phone_name, '');
            phones.push({
                brand,
                phone_name,
                slug,
                image,
                detail: req.protocol + '://' + req.get('host')+'/v2/'+slug
            })
        })
        

        return json(res, {
            title,
            phones
        });
    } catch (error) {
        return errorJson(res, error);
    }
};