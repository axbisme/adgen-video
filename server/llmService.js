const axios = require('axios');

async function generateAdCopy(product, message, tone) {
  const prompt = `Write a ${tone} ad copy for a product called "${product}". Highlight this message: ${message}. Use 40 character or less.`;

  try {
    const res = await axios.post(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        model: 'llama3-8b-8192',
        messages: [
          { role: 'system', content: 'You are a creative assistant.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 80
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    return res.data.choices[0].message.content.trim();
  } catch (error) {
    console.error('Groq error:', error.response?.data?.error || error.message);
    throw error;
  }
}

module.exports = { generateAdCopy };