const request = require("request-promise");
const cheerio = require("cheerio");
const { json, errorJson } = require("../../utils/response");

let brand;
let phone_name;
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
        let $ = await cheerio.load(htmlResult);
      
		phone = $("h1.specs-phone-name-title").text();
		if (!phone) {
			throw new Error("Invalid url!");
		}
		brand = phone.split(" ")[0];
		phone_name = phone.split(brand)[1].trim();
		thumbnail = $(".specs-photo-main")
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

			let featureKey = $('th:contains("' + feature + '")').text();
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
								key = $(e)
									.children("td.ttl")
									.children("a")
									.text();
								let val = $(e).children("td.nfo").text();
								if (!key) {
									if (index + 1 === tr_count) {
										key = "Other";
										obj.specs.push({ key, val: [val] });
									} else {
										key = key_prev;
										let find = obj.specs.find(
											(s) => s.key == key
										);
										if (val && find) {
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
		const release_date = $('.icon-launched').next().text();
		const dimension = $('.icon-mobile2').next().text();
		const os = $('.icon-os').next().text();
		const storage = $('.icon-sd-card-0').next().text();
		const phone_image_url = $('.icon-pictures').parent('a').attr('href');
		const phone_images = [];
		if(phone_image_url) {
			const html = await request.get(`${process.env.BASE_URL}/${phone_image_url}`);
			$ = await cheerio.load(html);
			$('#pictures-list').children('img').each((index, el) => {
				let src = $(el).attr('src');
				if(src) phone_images.push(src);
			});
		}
		return {
			brand,
			phone_name,
			thumbnail,
			phone_images,
			release_date,
			dimension,
			os,
			storage,
			scrapeResults,
		};
	} catch (error) {
		return Promise.reject(error);
	}
};

exports.index = async (req, res) => {
	try {
		const baseUrl = `${process.env.BASE_URL}`;
		const slug = req.params.slug;
		const url = `${baseUrl}/${slug}.php`;

		const response = await scrapeSpecs(url);
		response.specifications = response.scrapeResults;
		delete response.scrapeResults;
		scrapeResults = [];
		return json(res, response);
	} catch (error) {
		return errorJson(res, 'Please provide a valid phone slug!');
	}
};
