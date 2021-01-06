const puppeteer = require("puppeteer");
const cheerio = require('cheerio');


async function selectShoeSize(page, obj) {
    await page.goto(obj.nikeShoeUrl, { "waitUntil": "networkidle0"});
    const html = await page.content();
    const $ = cheerio.load(html);

    // Select shoe size
    const sizeButtons = $(".size-grid-dropdown.size-grid-button").get();
    const sizeButtonsLength = sizeButtons.length;

    for( let i = 0; i < sizeButtonsLength; i++) {
        const element = $(sizeButtons[i]);
        const enabled = !$(element).attr("disabled");
        const elementText = $(element).text().trim().toString();
        if (elementText === obj.shoeSize
            || elementText.substring(0, 3) === `M ${obj.shoeSize}`
            || elementText.substring(0, 4) === `M ${obj.shoeSize}`
            || elementText.substring(0, 5) === `M ${obj.shoeSize}`
            || elementText.substring(0, 6) === `M ${obj.shoeSize}`) {
            if (!enabled) {
                throw new Error("size not available");
            };
            await page.click(`div.buying-tools-container > ul > li:nth-child(${++i}) > button`);
            break;
        };
    };

    // Add to cart
    await page.click("button.ncss-btn-primary-dark.btn-lg");
    await sleep(3000);
};

async function sleep(miliseconds) {
    return new Promise(resolve => setTimeout(resolve, miliseconds));
}

async function checkout(page, obj) {
    await page.goto("https://www.nike.com/checkout", { "waitUntil": "networkidle0"});

    // fill personal info
    await page.type('#firstName', obj.firstName);
    await page.type('#lastName', obj.lastName);
    await page.click('#addressSuggestionOptOut');
    await page.type('#email', obj.email);
    await page.type('#phoneNumber', obj.phone);
    await page.type('#city', obj.city);
    await page.type('#address1', obj.address);
    await page.type('#postalCode', obj.zip);
    await page.select('#state', obj.state);
    await sleep(3000);
    await page.click('#shipping div.ncss-col-sm-12.mt2-sm.va-sm-t.ta-sm-r > button', {delay: 1000});

    // Shipping
    await page.waitForSelector('#shipping div.ncss-row > div > button');
    await sleep(5000);
    await page.click("#shipping div.ncss-row > div > button");

    // Payment
    await sleep(5000);
    const frame = page.frames()[4];
    await frame.type('#creditCardNumber', obj.cardNum);
    await frame.type('#expirationDate', obj.expDate);
    await frame.type('#cvNumber', obj.securityCode);
    await page.click("#payment > div > div.ncss-row > div:nth-child(2) > div.ncss-col-sm-12.pb5-sm.prl5-sm.va-sm-t.ta-sm-r > button");

    // Buy
    await sleep(5000);
    await page.click("");
}

async function purchase(obj) {
    const browser = await puppeteer.launch({ 
        headless: false,
        args: [`--window-size=${1024},${1024}`, '--disable-web-security', '--disable-features=IsolateOrigins,site-per-process']
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1024, height: 1024 });
    await selectShoeSize(page, obj);
    await checkout(page, obj);
};

//purchase();

module.exports = {
    purchase: purchase
}