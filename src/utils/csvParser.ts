import fs from 'fs';
import { parse } from 'csv-parse';

export async function parseCsvFile(filePath: string, requiredColumns: string[]) {
  return new Promise<any[]>((resolve, reject) => {
    const results: any[] = [];
    const parser = parse({ columns: true, trim: true });
    fs.createReadStream(filePath).pipe(parser)
      .on('data', (row: any) => {
        // Only keep required columns; ignore rows missing them
        const out: any = {};
        let ok = true;
        for (const c of requiredColumns) {
          if (!(c in row)) { ok = false; break; }
          out[c] = row[c];
        }
        if (ok) results.push(out);
      })
      .on('end', () => resolve(results))
      .on('error', (err) => reject(err));
  });
}
