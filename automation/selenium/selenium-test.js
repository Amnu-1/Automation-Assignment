const { Builder } = require("selenium-webdriver");

(async function () {
    let driver = await new Builder().forBrowser("chrome").build();

    try {
        await driver.get("http://127.0.0.1:5500/Portfolio/index.html");

        const title = await driver.getTitle();
        console.log("Page Title:", title);

    } finally {
        await driver.quit();
    }
})();