import React, { useState } from 'react';
import './styles.css'; // You can add your own styling in this file

const App = () => {
  const [universities, setUniversities] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [country, setCountry] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch data from the Hipolabs API
  const fetchUniversities = async () => {
    if (!country.trim()) {
      setError('Please enter a country.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const response = await fetch(
        `http://universities.hipolabs.com/search?country=${encodeURIComponent(country)}`
      );

      if (!response.ok) throw new Error('Failed to fetch data.');
      const data = await response.json();

      if (data.length === 0) {
        setError('No universities found for this country.');
        setUniversities([]);
        return;
      }

      setUniversities(data);
    } catch (err) {
      setError('Unable to fetch universities. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Filter universities based on search term
  const filteredUniversities = universities.filter((university) =>
    university.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app">
      <h1>University Information</h1>

      {/* Search by Country */}
      <div className="search-section">
        <input
          type="text"
          placeholder="Enter country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="input-field"
        />
        <button onClick={fetchUniversities} className="search-button">
          Search by Country
        </button>
      </div>

      {/* Search within Universities */}
      <div className="search-section">
        <input
          type="text"
          placeholder="Search universities"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input-field"
        />
      </div>

      {/* Loading or Error message */}
      {loading && <p>Loading...</p>}
      {error && <p className="error-message">{error}</p>}

      {/* Display the universities */}
      <div className="university-list">
        {filteredUniversities.length > 0 ? (
          filteredUniversities.map((university) => (
            <div key={university.name} className="university-card">
              <h2>{university.name}</h2>
              <p>
                <strong>Country:</strong> {university.country}
              </p>
              {university.web_pages?.length > 0 && (
                <a
                  href={university.web_pages[0]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="visit-link"
                >
                  Visit Website
                </a>
              )}
            </div>
          ))
        ) : (
          !loading && <p>No universities match your search.</p>
        )}
      </div>
    </div>
  );
};

export default App;
