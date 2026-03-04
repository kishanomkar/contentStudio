export const analyzeWithPuter = async (email) => {
  try {
    const response = await puter.ai.chat([
      {
        role: "system",
        content: "Categorize emails into GOOD_DEAL, BAD_DEAL, NOT_A_DEAL"
      },
      {
        role: "user",
        content: `
        Email:
        Subject: ${email.subject}
        Body: ${email.body}

        Return JSON:
        {
          "isDeal": true/false,
          "category": "GOOD_DEAL | BAD_DEAL | NOT_A_DEAL",
          "confidence": 0-100
        }
        `
      }
    ]);

    return JSON.parse(response.message.content);

  } catch (error) {
    console.log("Puter failed", error);
    return null;
  }
};