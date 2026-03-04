import fs from "fs";

export function exportCSV(data) {

  const header = "Subject,From,Category\n";

  const rows = data
    .map(e => `"${e.subject}","${e.from}","${e.category}"`)
    .join("\n");

  fs.writeFileSync("deals.csv", header + rows);
}