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
					detail: req.protocol + "://" + req.get("host") + "/" + slug,
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

exports.topInterest = async (req, res) => {
	try {
		const url = `${process.env.BASE_URL}`;
		const htmlResult = await request.get(url);
		const $ = await cheerio.load(htmlResult);
		const title = "Top By Daily Interest";
		const phones = [];
		$('h4:contains("interest")')
			.next()
			.find("tbody")
			.find("tr")
			.each((index, el) => {
				const phone_name = $(el).find("th").text();
				if (phone_name) {
					const slug = $(el)
						.find("th")
						.find("a")
						.attr("href")
						.replace(".php", "");
					const hits = $(el).find("td").eq(1).text();
					phones.push({
						phone_name,
						slug,
						hits: parseInt(hits.replace(/,/g, "")),
						detail:
							req.protocol + "://" + req.get("host") + "/" + slug,
					});
				}
			});

		return json(res, {
			title,
			phones,
		});
	} catch (error) {
		return errorJson(res, error);
	}
};

exports.topFans = async (req, res) => {
	try {
		const url = `${process.env.BASE_URL}`;
		const htmlResult = await request.get(url);
		const $ = await cheerio.load(htmlResult);
		const title = "Top By Daily Interest";
		const phones = [];
		$('h4:contains("fans")')
			.next()
			.find("tbody")
			.find("tr")
			.each((index, el) => {
				const phone_name = $(el).find("th").text();
				if (phone_name) {
					const slug = $(el)
						.find("th")
						.find("a")
						.attr("href")
						.replace(".php", "");
					const favorites = $(el).find("td").eq(1).text();
					phones.push({
						phone_name,
						slug,
						favorites: parseInt(favorites.replace(/,/g, "")),
						detail:
							req.protocol + "://" + req.get("host") + "/" + slug,
					});
				}
			});

		return json(res, {
			title,
			phones,
		});
	} catch (error) {
		return errorJson(res, error);
	}
};
