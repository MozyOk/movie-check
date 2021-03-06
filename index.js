const fs = require('fs')
var textLine = fs.readFileSync('data/test_id.csv', 'utf8', function (err, data) {
  if (err) throw err;
});
// console.log(textLine);
textArray = textLine.split(/\r\n|\r|\n/);
// console.log(textArray);

function delay(timeout) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}

const pc = {
  'name': 'Chrome Mac',
  'userAgent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36',
  'viewport': {
      'width': 1200,
      'height': 800,
      'deviceScaleFactor': 1,
      'isMobile': false,
      'hasTouch': false,
      'isLandscape': false
  }
};

const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 100
  })
  const page = await browser.newPage()
  await page.emulate(pc);

  for (let i = 0; i < textArray.length; i++) {
    const movie_id = textArray[i]
    console.log("movie_id:" + movie_id)

    // console.log("Page Goto: https://www.youtube.com/watch?v=" + movie_id)
    await page.goto('https://www.youtube.com/watch?v=' + movie_id, {
      waitUntil: 'networkidle2'
    })

    // delay delay delay
    await delay(3000);

    // open menu
    await page.waitForSelector('#menu > .ytd-video-primary-info-renderer > #button > #button > .style-scope')
    await page.click('#menu > .ytd-video-primary-info-renderer > #button > #button > .style-scope')

    // open transcript
    await page.waitForSelector('#contentWrapper > .dropdown-content > #items > .style-scope:nth-child(2) > .style-scope:nth-child(2)')
    await page.click('#contentWrapper > .dropdown-content > #items > .style-scope:nth-child(2) > .style-scope:nth-child(2)')

    // get transcript
    await page.waitForSelector('.ytd-transcript-body-renderer')
    const transcript = await page.evaluate(() => document.querySelector('#body .ytd-transcript-renderer').innerText);
    console.log(transcript)

  }
  await browser.close()
})()