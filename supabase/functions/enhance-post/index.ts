import { createClient } from "npm:@supabase/supabase-js@2.39.0";
import { Configuration, OpenAIApi } from "npm:openai@3.3.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function retryWithExponentialBackoff(fn: () => Promise<any>, maxRetries = 3) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      if (error.response?.status === 429 && attempt < maxRetries) {
        const delay = Math.min(1000 * Math.pow(2, attempt), 8000);
        await sleep(delay);
        continue;
      }
      throw error;
    }
  }
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { content, style } = await req.json();

    if (!content || !style) {
      return new Response(
        JSON.stringify({ error: "Content and style are required" }),
        {
          status: 400,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    const configuration = new Configuration({
      apiKey: Deno.env.get("OPENAI_API_KEY"),
    });
    const openai = new OpenAIApi(configuration);

    const prompt = `Rewrite the following content in the style of a viral LinkedIn post using the "${style}" format. Make it engaging and professional while maintaining the core message:\n\n${content}`;

    const completion = await retryWithExponentialBackoff(async () => {
      return await openai.createChatCompletion({
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
    });

    const enhancedContent = completion.data.choices[0].message?.content || "";

    return new Response(
      JSON.stringify({ enhancedContent }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    const status = error.response?.status || 500;
    const message = status === 429 
      ? "Rate limit exceeded. Please try again in a few moments."
      : "Failed to enhance post. Please try again.";

    return new Response(
      JSON.stringify({ 
        error: message,
        retryAfter: error.response?.headers?.['retry-after'] || null,
        status 
      }),
      {
        status,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});