# Edward – AI-baseret Forretningsplan Generator

## Sådan bruger du projektet

1. Upload projektet til GitHub
2. Importér det i Vercel (https://vercel.com/import/git)
3. Gå til Projekt > Settings > Environment Variables
4. Tilføj:
   - `OPENAI_API_KEY` = din hemmelige OpenAI nøgle
5. Klik "Deploy" – så virker det!

### Struktur:
- `public/index.html` – Formular og UI
- `api/generate.js` – Vercel-serverless backend til OpenAI
- `vercel.json` – Styrer routing til statiske filer

Made with ❤️ for iværksættere.