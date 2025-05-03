require('dotenv').config();
const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// async function generateAdCopy(product, message, tone) {
//   const systemPrompt = "You are a creative marketing assistant.";
//   const userPrompt = `Write a ${tone} ad copy for a product called "${product}". Highlight: ${message}`;

//   const response = await openai.chat.completions.create({
//     model: "gpt-3.5-turbo",
//     messages: [
//       { role: "system", content: systemPrompt },
//       { role: "user", content: userPrompt }
//     ],
//     max_tokens: 60,
//     temperature: 0.8,
//   });
// return response.choices[0].message.content.trim();
// }

    async function generateAdCopy(product, message, tone) {
        // Mocked AI response for local testing
        return `${product} is the future of hydration – ${message}, with a ${tone} vibe.`;
    }


module.exports = { generateAdCopy };
