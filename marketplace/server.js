const express = require('express');
const axios = require('axios');
const { load } = require('cheerio');

const app = express();
const PORT = 5000;

app.get('/search', async (req, res) => {
  const { query } = req.query;
  const searchUrl = `https://html.duckduckgo.com/html/?q=${encodeURIComponent(query)}`;

  try {
    const response = await axios.get(searchUrl);
    const html = response.data;
    const $ = load(html);
    const firstLink = $('.result__a').first().attr('href');

    if (firstLink) {
      res.json({ url: firstLink });
    } else {
      res.status(404).json({ error: 'Aucun lien trouvé.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la récupération des données.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
