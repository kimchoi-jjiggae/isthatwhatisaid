const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

puppeteer.use(StealthPlugin());

const app = express();
app.use(bodyParser.json());
app.use(cors())

app.post('/scrape', async (req, res) => {
  const url = req.body.url;
  if (url !== ""){
    try {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto(url, { waitUntil: 'networkidle0' });
      // await page.waitForSelector('.artwork-title a');
      let textContent = await page.evaluate(() => {
        return document.body.innerHTML;
      });
      await browser.close();
      res.send(textContent);
    } catch (error) {
      console.log(error);
      res.status(500).send('Error scraping website');
    }
  }
  else {
    res.send("");
  }
});

const port = 8080;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
