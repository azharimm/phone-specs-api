const request = require("request-promise");
const cheerio = require("cheerio");
const { json, errorJson } = require("../utils/response");
const Specs = require('../models/Specs');

let brand;
let brand_slug;
let phone_name;
let phone_name_slug;
let phone_img_url;
let scrapeResults = [];

let features = [
    "Network",
    "Launch",
    "Body",
    "Display",
    "Platform",
    "Memory",
    "Camera",
    "Main Camera",
    "Selfie camera",
    "Sound",
    "Comms",
    "Features",
    "Battery",
    "Misc",
    "Tests",
];

const scrapeSpecs = async (url) => {
    try {
        const htmlResult = await request.get(url);
        const $ = await cheerio.load(htmlResult);
        phone = $("h1.specs-phone-name-title").text();
        if(!phone) {
            throw new Error('Invalid url!');
        }
        brand = phone.split(" ")[0];
        phone_name = phone.split(brand)[1].trim();
        checkPlusSign = phone_name.includes('+');
        brand_slug = brand
            .toLowerCase()
            .replace(/ /g, "-")
            .replace(/[^\w-]+/g, "");
        phone_name_slug = phone_name
            .toLowerCase()
            .replace(/ /g, "-")
            .replace(/[^\w-]+/g, "")+(checkPlusSign ? '+':'');
        phone_img_url = $(".specs-photo-main")
            .children("a")
            .children("img")
            .attr("src");
        features.map((feature) => {
            let obj = {
                title: null,
                specs: [],
            };
            obj.title = feature;
            obj.specs = [];

            let featureKey = $('th:contains("'+feature+'")').text();
            if (featureKey && featureKey === feature) {
                $('th:contains("' + feature + '")')
                    .parent()
                    .parent()
                    .each((index, el) => {
                        let key_prev;
                        let tr_count = $(el).children("tr").length;
                        $(el)
                            .children("tr")
                            .each((index, e) => {
                                key = $(e).children("td.ttl").children("a").text();
                                let val = $(e).children("td.nfo").text();
                                if (!key) {
                                    if(index+1 === tr_count) {
                                        key = 'Other';
                                        obj.specs.push({ key, val: [val] });
                                    }else {
                                        key = key_prev;
                                        let find = obj.specs.find((s) => s.key == key);
                                        if(val && find) {
                                            find.val.push(val);
                                        }
                                    }
                                    return;
                                }
                                obj.specs.push({ key, val: [val] });
                                key_prev = key;
                            });
                    });
    
                scrapeResults.push(obj);
            }

        });
        return {
            brand,
            brand_slug,
            phone_name,
            phone_name_slug,
            phone_img_url,
            scrapeResults
        }
    } catch (error) {
        return Promise.reject(error);
    }
};

exports.index = async (req, res) => {
    try {
        const url = req.query.url;
        const baseUrl = 'https://www.gsmarena.com/';
        if(!url) {
            return errorJson(res, 'Please provide a valid URL!', 422);
        }
        if(!url.includes(baseUrl)) {
            return errorJson(res, 'Please provide a valid URL from gsmrena!', 422);
        }
        const response = await scrapeSpecs(url);
        const isExists = await Specs.findOne({phone_name_slug: response.phone_name_slug});
        if(isExists) {
            await Specs.findOneAndUpdate({phone_name_slug: response.phone_name_slug}, response, {upsert: true});
            return errorJson(res,
                'Data is already available in the database!',
            );
        }
        response.specifications = response.scrapeResults;
        const newData = new Specs(response);
        await newData.save();
        delete response.scrapeResults;
        scrapeResults = []
        return json(res, response);
    } catch (error) {
        return errorJson(res, error);
    }
}

exports.test = async (req, res) => {
    try {
        const url = req.query.url;
        const baseUrl = 'https://www.gsmarena.com/';
        if(!url) {
            return errorJson(res, 'Please provide a valid URL!', 422);
        }
        if(!url.includes(baseUrl)) {
            return errorJson(res, 'Please provide a valid URL from gsmrena!', 422);
        }
        const response = await scrapeSpecs(url);
        response.specifications = response.scrapeResults;
        return json(res, response);
    } catch (error) {
        return errorJson(res, error);
    }
}