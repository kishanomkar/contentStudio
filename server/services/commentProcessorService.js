import { fetchComments, replyToComment } from "./youtubeService.js";
import { classifyComment, generateReply } from "./openaiService.js";

export const processComments = async (user, videoId) => {
  const comments = await fetchComments(user, videoId);

  for (const thread of comments) {
    const comment = thread.snippet.topLevelComment.snippet.textDisplay;
    const commentId = thread.snippet.topLevelComment.id;

    const category = await classifyComment(comment);

    if (category === "Spam") continue;

    const replyText = await generateReply(category, comment);

    await replyToComment(user, commentId, replyText);
  }

  return { success: true };
};