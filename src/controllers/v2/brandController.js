const request = require("request-promise");
const cheerio = require("cheerio");
const { json, errorJson } = require("../../utils/response");

exports.index = async (req, res) => {
    try {
        const url = `${process.env.BASE_URL}/makers.php3`;
        const htmlResult = await request.get(url);
        const $ = await cheerio.load(htmlResult);
        const brands = [];
        $('table').find('tr').children('td').each((index, el) => {
            const element = $(el).children('a');
            const deviceCount = element.find('span').text();
            const brandName = element.text().replace(deviceCount, '');
            const brandSlug = element.attr('href').replace('.php', '');
            const brandId = element.attr('href').split('-')[2].replace('.php', '');
            brands.push({
                brandId: parseInt(brandId),
                brandName,
                brandSlug,
                deviceCount: parseInt(deviceCount.replace(' devices', '')),
                detail: req.protocol + '://' + req.get('host')+'/v2/brands/'+brandSlug
            })
        });

        return json(res, brands);
    } catch (error) {
        return errorJson(res, error);
    }
};

exports.show = async (req, res) => {
    try {
        const slug = req.params.slug;
        let page = req.query.page;
        let url;
        if(page === undefined || page == 1) {
            url = `${process.env.BASE_URL}/${slug}.php`;
            page = 1;
        }else {
            // apple-phones-f-48-0-p2.php
            const slug_split = slug.split('-')
            const id = slug_split[2];
            const phone_slug = slug_split[0]+'-'+slug_split[1];
            url = `${process.env.BASE_URL}/${phone_slug}-f-${id}-0-p${page}.php`;
        }
        const htmlResult = await request.get(url);
        const $ = await cheerio.load(htmlResult);
        const title = $('.article-info-name').text();
        const last_page = $('.nav-pages').find('a').length;
        const phones = [];
        $('.makers').children('ul').children('li').each((index, el) => {
            const slug = $(el).children('a').attr('href').replace('.php','');
            const image = $(el).find('img').attr('src');
            const phone_name = $(el).children('a').text();
            phones.push({
                phone_name,
                slug,
                image,
                detail: req.protocol + '://' + req.get('host')+'/v2/'+slug
            })
        })
        

        return json(res, {
            title,
            current_page: parseInt(page),
            last_page: parseInt(last_page) + 1,
            phones
        });
    } catch (error) {
        return errorJson(res, error);
    }
};