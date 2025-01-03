import React, { useState, useEffect } from "react";
import './Styles.css'
<styles className="css"></styles>

const university = () => {
  const [universities, setUniversities] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [country, setCountry] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchUniversities = async () => {
    if (!country) {
      setError("Please enter a country.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        `http://universities.hipolabs.com/search?country=${encodeURIComponent(country)}`
      );
      if (!response.ok) throw new Error("Failed to fetch data.");
      const data = await response.json();
      setUniversities(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredUniversities = universities.filter((university) =>
    university.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app">
      <h1>University info</h1>
      
      {/* Country Input */}
      <div>
        <input
          type="text"
          placeholder="Enter country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
        <button onClick={fetchUniversities}>Search by Country</button>
      </div>

      {/* Search Input */}
      <div>
        <input
          type="text"
          placeholder="Search universities"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* University List */}
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
                >
                  Visit Website
                </a>
              )}
            </div>
          ))
        ) : (
          <p>No universities match your search.</p>
        )}
      </div>
    </div>
  );
};

export default university;
