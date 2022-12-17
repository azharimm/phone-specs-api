const request = require("request-promise");
const cheerio = require("cheerio");
const { json, errorJson } = require("../../utils/response");

exports.index = async (req, res) => {
	try {
		const url = `${process.env.BASE_URL}/makers.php3`;
		const htmlResult = await request.get(url);
		const $ = await cheerio.load(htmlResult);
		const brands = [];
		$("table")
			.find("tr")
			.children("td")
			.each((index, el) => {
				const element = $(el).children("a");
				const device_count = element.find("span").text();
				const brand_name = element.text().replace(device_count, "");
				const brand_slug = element.attr("href").replace(".php", "");
				const brand_id = element
					.attr("href")
					.split("-")[2]
					.replace(".php", "");
				brands.push({
					brand_id: parseInt(brand_id),
					brand_name,
					brand_slug,
					device_count: parseInt(
						device_count.replace(" devices", "")
					),
					detail:
						req.protocol +
						"://" +
						req.get("host") +
						"/brands/" +
						brand_slug,
				});
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
		if (page === undefined || page == 1) {
			url = `${process.env.BASE_URL}/${slug}.php`;
			page = 1;
		} else {
			// apple-phones-f-48-0-p2.php
			const slug_split = slug.split("-");
			const id = slug_split[2];
			const phone_slug = slug_split[0] + "-" + slug_split[1];
			url = `${process.env.BASE_URL}/${phone_slug}-f-${id}-0-p${page}.php`;
		}
		const htmlResult = await request.get(url);
		const $ = await cheerio.load(htmlResult);
		const title = $(".article-info-name").text();
		const last_page = $(".nav-pages").find("a").length;
		const phones = [];
		$(".makers")
			.children("ul")
			.children("li")
			.each((index, el) => {
				const slug = $(el)
					.children("a")
					.attr("href")
					.replace(".php", "");
				const image = $(el).find("img").attr("src");
				const phone_name = $(el).children("a").text();
				phones.push({
					brand: title.replace("phones", ""),
					phone_name,
					slug,
					image,
					detail: req.protocol + "://" + req.get("host") + "/" + slug,
				});
			});

		return json(res, {
			title,
			current_page: parseInt(page),
			last_page: parseInt(last_page) + 1,
			phones,
		});
	} catch (error) {
		return errorJson(res, error);
	}
};
