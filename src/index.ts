import 'dotenv/config';
import path from 'path';
import fs from 'fs';
import { runPlaywrightDownload } from './playwrightScript';
import { parseCsvFile } from './utils/csvParser';
import { initDb, BabyName } from './db';
import { sendContactToHubspot } from './hubspot';

async function main() {
  const downloadDir = process.env.DOWNLOAD_DIR || './downloads';
  if (!fs.existsSync(downloadDir)) fs.mkdirSync(downloadDir, { recursive: true });
  const csvPath = path.resolve(downloadDir, 'babyNamesUSYOB-full.csv');

  console.log('Launching Playwright to download CSV...');
  await runPlaywrightDownload(csvPath);

  console.log('Parsing CSV...');
  const rows = await parseCsvFile(csvPath, ['Name', 'Sex']);
  console.log(`Parsed ${rows.length} rows.`);

  console.log('Initializing DB...');
  const sequelize = await initDb();

  console.log('Upserting rows to DB...');
  for (const r of rows) {
    const [instance, created] = await BabyName.findOrCreate({
      where: { name: r.Name, sex: r.Sex },
      defaults: { name: r.Name, sex: r.Sex }
    });
  }
  console.log('Stored in DB.');

  console.log('Sending 10 sample contacts to HubSpot (first 10 rows)...');
  for (let i = 0; i < Math.min(10, rows.length); i++) {
    const r = rows[i];
    try {
      await sendContactToHubspot({ email: `demo+${i}@example.com`, firstname: r.Name, lastname: '', gender: r.Sex });
      console.log(`Sent contact for ${r.Name}`);
    } catch (err) {
      console.error('HubSpot error', err);
    }
  }

  await sequelize.close();
  console.log('Done.');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
