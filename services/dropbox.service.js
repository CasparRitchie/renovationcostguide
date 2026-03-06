const { Dropbox } = require("dropbox");
const fetch = require("node-fetch");

const dbx = new Dropbox({
  accessToken: process.env.DROPBOX_ACCESS_TOKEN,
  fetch,
});

const FILE_PATH = "/renovation-cost-guide/leads.csv";

async function appendLeadToDropbox(row) {
  try {
    let existing = "";

    try {
      const response = await dbx.filesDownload({ path: FILE_PATH });
      existing = response.result.fileBinary.toString();
    } catch (err) {
      console.log("CSV not found yet — creating new one");
    }

    const updated = existing + "\n" + row;

    await dbx.filesUpload({
      path: FILE_PATH,
      contents: updated,
      mode: { ".tag": "overwrite" },
    });

  } catch (error) {
    console.error("Dropbox append failed:", error);
  }
}

module.exports = { appendLeadToDropbox };
