// Read from environment if available, otherwise fallback to hardcoded (for demo)
const ENV_KEY = import.meta.env.VITE_GROQ_API_KEY;

export const GROQ_CONFIG = {
  API_KEY: ENV_KEY || 'YOUR_GROQ_API_KEY_HERE',
  MODEL: import.meta.env.VITE_GROQ_MODEL || 'llama-3.3-70b-versatile',
  MAX_RETRIES: 3,
  BASE_DELAY_MS: 1000,
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'https://api.groq.com/openai/v1/chat/completions',
};

const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export async function callGroq(messages, temperature = 0.1, maxTokens = 4096) {
  let attempt = 0;
  
  while (attempt < GROQ_CONFIG.MAX_RETRIES) {
    try {
      const response = await fetch(GROQ_CONFIG.BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${GROQ_CONFIG.API_KEY}`,
        },
        body: JSON.stringify({
          model: GROQ_CONFIG.MODEL,
          messages,
          temperature,
          max_tokens: maxTokens,
          response_format: { type: 'json_object' },
        })
      });

      if (!response.ok) {
        if (response.status === 429) {
          const retryAfter = response.headers.get('retry-after');
          const delay = retryAfter ? (parseInt(retryAfter) + attempt) * 1000 : GROQ_CONFIG.BASE_DELAY_MS * Math.pow(2, attempt);
          await wait(delay);
          attempt++;
          continue;
        }
        throw new Error(`Groq API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      const content = data.choices[0].message.content;
      
      if (!content) {
        throw new Error('Empty response from Groq');
      }

      return JSON.parse(content);
    } catch (err) {
      if (attempt === GROQ_CONFIG.MAX_RETRIES - 1) {
        throw new Error(`Failed after ${GROQ_CONFIG.MAX_RETRIES} attempts. ${err.message}`);
      }
      const delay = GROQ_CONFIG.BASE_DELAY_MS * Math.pow(2, attempt) + Math.random() * 500;
      await wait(delay);
      attempt++;
    }
  }
}
