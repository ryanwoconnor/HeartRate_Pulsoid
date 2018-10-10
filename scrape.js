const puppeteer = require('puppeteer');

let scrape = async () => {
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();

    await page.goto('your-pulsoid-url');
    await page.waitFor(1000);

    const result = await page.evaluate(() => {
        let heartRate = document.querySelector('span').innerText;

        return {
            "message": {
		"heartrate": heartRate
		}
        }

    });

    browser.close();
    return result;
};

var SplunkLogger = require("splunk-logging").Logger;

var config = {
    token: "your-token-here",
    url: "http://your-HEC-URL:8088"
};

var Logger = new SplunkLogger(config);


scrape().then((value) => {
    console.log(value); // Success!
    console.log("Sending payload", value);
    Logger.send(value, function(err, resp, body) {
    //If successful, body will be { text: 'Success', code: 0 }
        console.log("Response from Splunk", body);
    });
});

