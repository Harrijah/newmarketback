import React, { useState } from 'react';
import axios from 'axios';

const Testrender = () => {
  const [keywords, setKeywords] = useState('');
  const [resultUrl, setResultUrl] = useState('');
  const [error, setError] = useState('');

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/search?query=site web ${encodeURIComponent(keywords)}`);
      const data = response.data;

      if (data.url) {
        setResultUrl(data.url);
        setError('');
      } else {
        setResultUrl('');
        setError(data.error || 'Aucun lien trouvé.');
      }
    } catch (error) {
      setResultUrl('');
      setError(`Erreur : ${error.message}`);
    }
  };

  return (
    <div>
      <h2>Recherche DuckDuckGo</h2>
      <input
        type="text"
        value={keywords}
        onChange={(e) => setKeywords(e.target.value)}
        placeholder="Entrez des mots-clés"
      />
      <button onClick={handleSearch}>Rechercher</button>

      <div style={{ marginTop: '20px' }}>
        {resultUrl ? (
          <p>Premier lien trouvé : <a href={resultUrl} target="_blank" rel="noopener noreferrer">{resultUrl}</a></p>
        ) : (
          <p>{error}</p>
        )}
      </div>
    </div>
  );
};

export default Testrender;
