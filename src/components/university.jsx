import React from "react";

const university = ({ university }) => {
  return (
    <div className="card">
      <h2>{university.name}</h2>
      <p>
        <strong>Country:</strong> {university.country}
      </p>
      {university.web_pages?.length > 0 && (
        <a href={university.web_pages[0]} target="_blank" rel="noopener noreferrer">
          Visit Website
        </a>
      )}
    </div>
  );
};

export default university;
