const cheerioCrawler = require('./cheerio');

(async () => {
  try {
    await cheerioCrawler.excute()
  } catch (error) {
    console.log('error', error)
  }
})();