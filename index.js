const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage()

  await page.setViewport({ width: 1280, height: 920 })

  await page.goto('https://www.youtube.com/watch?v=B0GLTMa3r_w')
  
  // open menu
  await page.waitForSelector('#menu > .ytd-video-primary-info-renderer > #button > #button > .style-scope')
  await page.click('#menu > .ytd-video-primary-info-renderer > #button > #button > .style-scope')
  
  // open transcript
  await page.waitForSelector('#contentWrapper > .dropdown-content > #items > .style-scope:nth-child(2) > .style-scope:nth-child(2)')
  await page.click('#contentWrapper > .dropdown-content > #items > .style-scope:nth-child(2) > .style-scope:nth-child(2)')
  
  await page.waitForSelector('.ytd-transcript-body-renderer')
  const transcript = await page.evaluate( () => document.querySelector('#body .ytd-transcript-renderer').innerText);
  console.log(transcript)
  
  await browser.close()
})()