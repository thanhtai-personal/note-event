
const puppeteer = require('puppeteer');

const getNovalsChapters = async (novals) => {
  try {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    for (noval of novals) {
      console.log('==process noval: ', noval.url)
      await page.goto(noval.url)
      console.log('==process noval success: ', noval.url)
    }
    await browser.close();
  } catch (error) {
    console.log('----------------PUPPETEER ACTION FAILED')
  }
}

module.exports = {
  getNovalsChapters
}