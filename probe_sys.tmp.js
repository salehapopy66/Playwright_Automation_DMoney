const { chromium } = require('@playwright/test');
(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ storageState: 'auth.json' });
  const page = await context.newPage();
  await page.goto('https://dmoneyportal.roadtocareer.net/login');
  console.log('url right after goto /login (with stale auth.json):', page.url());
  await browser.close();
})();
