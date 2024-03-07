import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import Data from './resources/countryData.json'

function App() {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);
  const [escape, setEscape] = useState(false);
  const inputRef = useRef(null); // Create a ref for the input element

  const findsearch = (e) => {
    const value = e.target.value;
    setSearch(value);

    const suggestion = Data.filter(({ name }) =>
      name.toLowerCase().startsWith(value.toLowerCase())
    );
    setResults(suggestion);
  };

  const resultList = () => (
    results.map((suggestion, index) => (
      <div key={index} className="suggestions">
        {suggestion.name}
      </div>
    ))
  );

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSearch('');
        setResults([]);
        setEscape(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (escape) {
      setEscape(false);
    }
  }, [escape]);

  useEffect(() => {
    // Focus the input box when the component mounts
    inputRef.current.focus();
  }, []);

  return (
    <div className="Container">
      <input
        ref={inputRef} // Attach the ref to the input element
        type="text"
        id="text"
        onChange={findsearch}
        placeholder="Enter Country Name" // Changed to 'placeholder'
        className="search-input"
      />
      <button id="btn" className="search-button">
        S E A R C H
      </button>
      <div className="results">{resultList()}</div>
    </div>
  );
}

export default App;