import { google } from 'googleapis';
import User from '../models/User.js';
import Email from '../models/Email.js';

const gmail = google.gmail('v1');

export const fetchEmails = async (userId, pageToken = null) => {
  try {
    const user = await User.findById(userId);
    console.log("User:", user);
    if (!user) throw new Error('User not found');

    const auth = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET
    );
    auth.setCredentials({
      access_token: user.googleAccessToken,
      refresh_token: user.googleRefreshToken
    });

    // Fetch email list
    const response = await gmail.users.messages.list({
      userId: 'me',
      maxResults: 10,
      pageToken,
      auth
    });

    const messages = response.data.messages || [];
    const emailIds = messages.map(m => m.id);

    // Fetch full email details
    const emails = [];
    for (const messageId of emailIds) {
      try {
        const message = await gmail.users.messages.get({
          userId: 'me',
          id: messageId,
          format: 'full',
          auth
        });

        const headers = message.data.payload.headers;
        const from = headers.find(h => h.name === 'From')?.value || '';
        const to = headers.find(h => h.name === 'To')?.value || '';
        const subject = headers.find(h => h.name === 'Subject')?.value || '';
        const date = headers.find(h => h.name === 'Date')?.value || '';

        let body = '';
        let plainText = '';

        if (message.data.payload.parts) {
          for (const part of message.data.payload.parts) {
            if (part.mimeType === 'text/plain' && part.body.data) {
              plainText = Buffer.from(part.body.data, 'base64').toString();
              break;
            }
            if (part.mimeType === 'text/html' && part.body.data) {
              body = Buffer.from(part.body.data, 'base64').toString();
            }
          }
        } else if (message.data.payload.body.data) {
          plainText = Buffer.from(message.data.payload.body.data, 'base64').toString();
          body = plainText;
        }

        // Check if email already exists
        let emailDoc = await Email.findOne({
          userId,
          gmailId: messageId
        });

        if (!emailDoc) {
          emailDoc = new Email({
            userId,
            gmailId: messageId,
            from,
            to,
            subject,
            body,
            plainText,
            receivedAt: new Date(date)
          });
          await emailDoc.save();
        }

        emails.push({
          _id: emailDoc._id,
          gmailId: messageId,
          from,
          subject,
          receivedAt: emailDoc.receivedAt,
          isDeal: emailDoc.isDeal,
          dealCategory: emailDoc.dealCategory,
          isAnalyzed: emailDoc.isAnalyzed
        });
      } catch (error) {
        console.error(`Error fetching message ${messageId}:`, error.message);
      }
    }

    return {
      emails,
      nextPageToken: response.data.nextPageToken || null,
      totalCount: response.data.resultSizeEstimate || 0
    };
  } catch (error) {
    throw new Error('Failed to fetch emails: ' + error.message);
  }
};

export const getEmailDetails = async (userId, emailId) => {
  try {
    const email = await Email.findOne({ _id: emailId, userId });
    if (!email) throw new Error('Email not found');
    return email;
  } catch (error) {
    throw new Error('Failed to get email details: ' + error.message);
  }
};

// services/googleAuthService.js



export const createOAuthClient = (user) => {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
  );

  oauth2Client.setCredentials({
    access_token: user.googleAccessToken,
    refresh_token: user.googleRefreshToken,
  });

  return oauth2Client;
};

