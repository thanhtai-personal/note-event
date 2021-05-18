const { JSDOM } = require("jsdom")
const axios = require('axios')

const upvoteFirstPost = async () => {
  try {
    const data = await axios.get("https://www.npmjs.com/package/axios");
    const dom = new JSDOM(data, {
      runScripts: "dangerously",
      resources: "usable"
    });
    const { document } = dom.window;
    const firstPost = document.querySelector("div > div.midcol > div.arrow");
    firstPost.click();
    const isUpvoted = firstPost.classList.contains("upmod");
    const msg = isUpvoted
      ? "Post has been upvoted successfully!"
      : "The post has not been upvoted!";

    return msg;
  } catch (error) {
    console.log('error', error)
  }
};

upvoteFirstPost().then(msg => console.log(msg));