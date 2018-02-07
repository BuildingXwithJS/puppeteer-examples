const puppeteer = require('puppeteer');

const config = {
  viewport: {
    width: 1920,
    height: 1080,
  },
};

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport(config.viewport);

  // Enable both JavaScript and CSS coverage
  await Promise.all([page.coverage.startJSCoverage(), page.coverage.startCSSCoverage()]);

  await page.goto('http://localhost:3000');
  // wait for page to render completely
  await page.waitFor('input');

  // Disable both JavaScript and CSS coverage
  const [jsCoverage, cssCoverage] = await Promise.all([
    page.coverage.stopJSCoverage(),
    page.coverage.stopCSSCoverage(),
  ]);

  const jsTotalBytes = jsCoverage.reduce((acc, val) => acc + val.text.length, 0);
  const cssTotalBytes = cssCoverage.reduce((acc, val) => acc + val.text.length, 0);
  const jsUsedBytes = jsCoverage.reduce(
    (acc, val) => acc + val.ranges.reduce((racc, rval) => racc + rval.end - rval.start - 1, 0),
    0
  );
  const cssUsedBytes = cssCoverage.reduce(
    (acc, val) => acc + val.ranges.reduce((racc, rval) => racc + rval.end - rval.start - 1, 0),
    0
  );
  console.log(`Used js bytes: ${Math.floor(jsUsedBytes / jsTotalBytes * 100)}%`);
  console.log(`Used css bytes: ${Math.floor(cssUsedBytes / cssTotalBytes * 100)}%`);

  await browser.close();
})();
