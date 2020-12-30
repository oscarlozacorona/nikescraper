const puppeteer = require("puppeteer");
const cheerio = require('cheerio');

const priceSetter = (price) => {
    let newPrice = "";
    let dollarSign = 0
    for (let i=0; i < price.length; i++) {
        if (price[i] === '$') {
            dollarSign++;
        }
        if (dollarSign >= 2) {
            break;
        }
        newPrice += price[i];
    }
    return newPrice;
}

const dateSetter = (date) => {
    const loc = date.search("AM") + 2
    return date.substring(0, loc);
}

async function scrapePrice(page, shoes) {
    for (let i=0; i < shoes.length; i++) {
        await page.goto(shoes[i].itemUrl, { "waitUntil": "networkidle0"});
        const html = await page.content();
        const $ = cheerio.load(html);

        const price = priceSetter($(".product-info").find("div.headline-5").text().trim());
        const date = dateSetter($(".available-date-component").text());

        shoes[i].price = price;
        shoes[i].date = date;
    }

    return shoes;
}

async function scrapefeed(page) {
    await page.goto("https://www.nike.com/launch", { "waitUntil": "networkidle0"});
    await page.evaluate("window.scrollTo(0, document.body.scrollHeight/3)");
    await page.waitForFunction(`document.body.scrollHeight > ${0}`);

    const html = await page.content();
    const $ = cheerio.load(html);

    let items = $(".product-card").map((index, element) => {
        const itemUrl = "https://www.nike.com" + $(element).find("a.card-link").attr("href");
        const itemImage = $(element).find(".image-component").attr("src");
        const itemName = $(element).find(".headline-5").text().trim();
        const itemSubName = $(element).find(".headline-3").text().trim();
        return {
            itemUrl: itemUrl,
            itemImage: itemImage,
            itemName: itemName,
            itemSubName: itemSubName,
        }
    }).get();

    // filter 
    items = items.filter(item => (item.itemName && item.itemImage && item.itemSubName));

    return items;
}

async function getItems() {
    const browser = await puppeteer.launch({ 
        headless: true,
        args: [`--window-size=${2048},${2048}`]
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 2048, height: 2048 })
    let items = await scrapefeed(page);
    items = await scrapePrice(page, items);
    await browser.close();
    return items;
};


module.exports = {
    getItems,
}