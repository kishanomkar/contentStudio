import { google } from "googleapis";

import { classifyComment } from "./openaiService.js";

import { createOAuthClient } from "./googleAuthService.js";



export const fetchComments = async (user, videoId) => {
  const auth = createOAuthClient(user);

  const youtube = google.youtube({
    version: "v3",
    auth,
  });

  const response = await youtube.commentThreads.list({
    part: "snippet",
    videoId,
    maxResults: 20,
  });

  return response.data.items;
};

// youtubeService.js
export const replyToComment = async (user, commentId, replyText) => {
  const auth = createOAuthClient(user);
  const youtube = google.youtube({ version: "v3", auth });

  await youtube.comments.insert({
    part: "snippet",
    requestBody: {
      snippet: {
        parentId: commentId,
        textOriginal: replyText,
      },
    },
  });
};