const fs = require('fs');
const {promisify} = require('util');
const puppeteer = require('puppeteer');
const lighthouse = require('lighthouse');

const config = {
  viewport: {
    width: 1920,
    height: 1080,
  },
};

const fsWriteFile = promisify(fs.writeFile);

(async () => {
  const browser = await puppeteer.launch({
    args: ['--remote-debugging-port=9222'],
  });
  const page = await browser.newPage();
  await page.setViewport(config.viewport);

  const results = await lighthouse('http://localhost:3000');

  await fsWriteFile('results.json', JSON.stringify(results, null, 2), 'utf8');

  console.log(`Audit finished, score is ${results.score}`);

  await browser.close();
})();
