const request = require("request-promise");
const cheerio = require("cheerio");
const { json, errorJson } = require("../../utils/response");

exports.index = async (req, res) => {
	try {
		const url = `${process.env.BASE_URL}`;
		const htmlResult = await request.get(url);
		const $ = await cheerio.load(htmlResult);
		const title = "Latest Devices";
		const phones = [];
		$(".module-latest")
			.find("a")
			.each((index, el) => {
				const phone_name = $(el).text();
				const image = $(el).find("img").attr("src");
				const slug = $(el).attr("href").replace(".php", "");
				phones.push({
					phone_name,
					slug,
					image,
					detail:
						req.protocol + "://" + req.get("host") + "/v2/" + slug,
				});
			});

		return json(res, {
			title,
			phones,
		});
	} catch (error) {
		return errorJson(res, error);
	}
};
