import { google } from "googleapis";

export async function getEmails(auth) {
  const gmail = google.gmail({ version: "v1", auth });

  const res = await gmail.users.messages.list({
    userId: "me",
    maxResults: 20,
  });

  const messages = res.data.messages || [];

  const emails = [];

  for (const msg of messages) {
    const m = await gmail.users.messages.get({
      userId: "me",
      id: msg.id,
    });

    const headers = m.data.payload.headers;

    const subject = headers.find(h => h.name === "Subject")?.value;
    const from = headers.find(h => h.name === "From")?.value;

    emails.push({
      subject,
      from,
      snippet: m.data.snippet
    });
  }

  return emails;
}