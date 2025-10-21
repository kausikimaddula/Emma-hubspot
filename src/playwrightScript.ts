import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

// This script logs into Kaggle and downloads the specified CSV.
// Kaggle sometimes enforces additional checks; you may need to adapt selectors.

export async function runPlaywrightDownload(destCsvPath: string) {
  const email = process.env.KAGGLE_EMAIL;
  const password = process.env.KAGGLE_PASSWORD;
  if (!email || !password) throw new Error('KAGGLE_EMAIL/KAGGLE_PASSWORD env required');

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    acceptDownloads: true
  });
  const page = await context.newPage();

  // 1. Go to login
  await page.goto('https://www.kaggle.com/account/login?returnUrl=%2F');
  await page.fill('input[name="email"]', email);
  await page.fill('input[name="password"]', password);
  await Promise.all([
    page.waitForNavigation({ waitUntil: 'networkidle' }),
    page.click('button[type="submit"]')
  ]);

  // 2. Navigate to dataset page
  const datasetUrl = 'https://www.kaggle.com/datasets/thedevastator/us-baby-names-by-year-of-birth?select=babyNamesUSYOB-full.csv';
  await page.goto(datasetUrl, { waitUntil: 'domcontentloaded' });

  // 3. Click the download file link (the page has a file list). Use the 'Download' link or direct file link.
  // Try to find anchor with the csv filename
  const link = await page.$(`a:has-text("babyNamesUSYOB-full.csv")`);
  if (link) {
    const [download] = await Promise.all([page.waitForEvent('download'), link.click()]);
    const suggested = await download.suggestedFilename();
    const finalName = path.basename(destCsvPath);
    await download.saveAs(destCsvPath);
  } else {
    // fallback: try the dataset API raw file URL pattern (may require cookies). Attempt clicking "Download All" then extract from zip.
    throw new Error('CSV link not found on dataset page. You may need to adjust selectors or manually download once to get the URL.');
  }

  await browser.close();
}
