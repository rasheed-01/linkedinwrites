"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.enhancePost = void 0;
const functions = require("firebase-functions");
const openai_1 = require("openai");
const configuration = new openai_1.Configuration({
    apiKey: functions.config().openai.key, // ✅ fixed: use Firebase env config
});
const openai = new openai_1.OpenAIApi(configuration);
exports.enhancePost = functions.https.onCall(async (data, context) => {
    var _a, _b;
    const { content, style } = data;
    if (!content || !style) {
        throw new functions.https.HttpsError('invalid-argument', 'Content and style are required');
    }
    try {
        const prompt = `Rewrite the following content in the style of a viral LinkedIn post using the "${style}" format. Make it engaging and professional while maintaining the core message:\n\n${content}`;
        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: "You are an expert at writing viral LinkedIn posts. Format the text with appropriate line breaks, emojis, and emphasis to maximize engagement.",
                },
                {
                    role: "user",
                    content: prompt,
                },
            ],
        });
        const enhancedContent = ((_a = completion.data.choices[0].message) === null || _a === void 0 ? void 0 : _a.content) || "";
        return { enhancedContent };
    }
    catch (error) {
        console.error("OpenAI error:", ((_b = error === null || error === void 0 ? void 0 : error.response) === null || _b === void 0 ? void 0 : _b.data) || error.message || error);
        throw new functions.https.HttpsError('internal', 'Failed to enhance post', (error === null || error === void 0 ? void 0 : error.message) || 'Unknown error');
    }
});
//# sourceMappingURL=index.js.map