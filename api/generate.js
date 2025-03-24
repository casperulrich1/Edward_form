// /api/generate.js

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Kun POST tilladt' });
  }

  const input = req.body;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'Du er en startup-rådgiver. Du hjælper med at skrive klare og professionelle forretningsplaner baseret på brugerens input.'
          },
          {
            role: 'user',
            content: formatInput(input)
          }
        ]
      })
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: 'AI kald mislykkedes', message: err.message });
  }
}

function formatInput(input) {
  return Object.entries(input)
    .map(([key, val]) => `• ${key}:\n${val}`)
    .join('\n\n');
}
