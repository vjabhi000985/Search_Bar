import React, { useState, useEffect } from 'react';
import './SearchBar.css'; // For styling

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [countries, setCountries] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Fetch data from the provided URL
    const fetchData = async () => {
      try {
        const response = await fetch('https://dpaste.com/79QXDY8TD.txt');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const text = await response.text();
        const data = JSON.parse(text); // Convert text to JSON
        setCountries(data);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };
    fetchData();
  }, []);

  const handleChange = (event) => {
    const { value } = event.target;
    setQuery(value);

    if (value.length > 1) {
      const filtered = countries.filter(country =>
        country.country.toLowerCase().includes(value.toLowerCase()) ||
        country.capital.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const loadNextItem = () => {
    setCurrentIndex(prevIndex => {
      if (prevIndex + 1 < countries.length) {
        return prevIndex + 1;
      }
      return prevIndex; // Prevent going out of bounds
    });
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search for a country or capital..."
      />
      {suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.slice(currentIndex, currentIndex + 1).map((item, index) => (
            <li key={index}>
              <strong>{item.country}</strong> - {item.capital}
            </li>
          ))}
        </ul>
      )}
      {suggestions.length > 0 && currentIndex + 1 < suggestions.length && (
        <button onClick={loadNextItem} className="load-more">
          Load Next
        </button>
      )}
    </div>
  );
};

export default SearchBar;
