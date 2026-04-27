const { Dropbox } = require("dropbox");
const fetch = require("node-fetch");

const FILE_PATH = "/renovation-cost-guide/leads.csv";

async function getDropboxAccessToken() {
  if (process.env.DROPBOX_ACCESS_TOKEN && !process.env.DROPBOX_REFRESH_TOKEN) {
    return process.env.DROPBOX_ACCESS_TOKEN;
  }

  const refreshToken = process.env.DROPBOX_REFRESH_TOKEN;
  const appKey = process.env.DROPBOX_APP_KEY;
  const appSecret = process.env.DROPBOX_APP_SECRET;

  if (!refreshToken || !appKey || !appSecret) {
    throw new Error(
      "Missing Dropbox credentials. Set DROPBOX_APP_KEY, DROPBOX_APP_SECRET and DROPBOX_REFRESH_TOKEN."
    );
  }

  const response = await fetch("https://api.dropboxapi.com/oauth2/token", {
    method: "POST",
    headers: {
      Authorization:
        "Basic " + Buffer.from(`${appKey}:${appSecret}`).toString("base64"),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    console.error("Dropbox token refresh failed:", data);
    throw new Error(data.error || "Dropbox token refresh failed");
  }

  return data.access_token;
}

async function getDropboxClient() {
  const accessToken = await getDropboxAccessToken();

  return new Dropbox({
    accessToken,
    fetch,
  });
}

async function appendLeadToDropbox(row) {
  try {
    const dbx = await getDropboxClient();
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

async function uploadBufferToDropbox({ dropboxPath, buffer }) {
  const dbx = await getDropboxClient();

  await dbx.filesUpload({
    path: dropboxPath,
    contents: buffer,
    mode: { ".tag": "overwrite" },
    autorename: false,
  });

  return {
    dropboxPath,
  };
}

async function uploadJsonToDropbox({ dropboxPath, data }) {
  const dbx = await getDropboxClient();
  const contents = JSON.stringify(data, null, 2);

  await dbx.filesUpload({
    path: dropboxPath,
    contents,
    mode: { ".tag": "overwrite" },
    autorename: false,
  });

  return {
    dropboxPath,
  };
}

module.exports = {
  appendLeadToDropbox,
  uploadBufferToDropbox,
  uploadJsonToDropbox,
};
