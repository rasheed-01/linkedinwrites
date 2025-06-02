import * as functions from 'firebase-functions';
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: functions.config().openai.key, // ✅ fixed: use Firebase env config
});
const openai = new OpenAIApi(configuration);

export const enhancePost = functions.https.onCall(async (data, context) => {
  const { content, style } = data;

  if (!content || !style) {
    throw new functions.https.HttpsError(
      'invalid-argument',
      'Content and style are required'
    );
  }

  try {
    const prompt = `Rewrite the following content in the style of a viral LinkedIn post using the "${style}" format. Make it engaging and professional while maintaining the core message:\n\n${content}`;

    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are an expert at writing viral LinkedIn posts. Format the text with appropriate line breaks, emojis, and emphasis to maximize engagement.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const enhancedContent = completion.data.choices[0].message?.content || "";

    return { enhancedContent };
  } catch (error: any) {
    console.error("OpenAI error:", error?.response?.data || error.message || error);
    throw new functions.https.HttpsError(
      'internal',
      'Failed to enhance post',
      error?.message || 'Unknown error'
    );
  }
});
