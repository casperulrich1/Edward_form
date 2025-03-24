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
            content: 'Du er en startup-rådgiver. Du hjælper med at skrive klare og overbevisende forretningsplaner baseret på input fra iværksættere.'
          },
          {
            role: 'user',
            content: generatePromptFromInput(input)
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

function generatePromptFromInput(input) {
  let output = 'Her er mine svar til forretningsplanen:\n\n';
  for (const [key, value] of Object.entries(input)) {
    output += `• ${capitalize(key)}:\n${value}\n\n`;
  }
  return output;
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).replace(/([A-Z])/g, ' $1');
}