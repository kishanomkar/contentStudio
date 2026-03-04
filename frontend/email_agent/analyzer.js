import OpenAI from "openai";

export async function analyzeDeals(emails, apiKey) {

  const openai = new OpenAI({
    apiKey: apiKey
  });

  const results = [];

  for (const email of emails) {

    const prompt = `
Classify this email:

Subject: ${email.subject}
Text: ${email.snippet}

Categories:
- Good Deal
- Bad Deal
- Not a Deal

Return ONLY category.
`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "user", content: prompt }
      ]
    });

    results.push({
      subject: email.subject,
      from: email.from,
      category: response.choices[0].message.content
    });
  }

  return results;
}