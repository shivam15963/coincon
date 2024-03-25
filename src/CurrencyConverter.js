// src/CurrencyConverter.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CurrencyConverter = () => {
  const [exchangeRates, setExchangeRates] = useState({});
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('INR');
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(null);

  useEffect(() => {
    // Fetch latest exchange rates from Open Exchange Rates API
    axios.get('https://open.er-api.com/v6/latest')
      .then(response => {
        setExchangeRates(response.data.rates);
      })
      .catch(error => {
        console.error('Error fetching exchange rates:', error);
      });
  }, []);

  const convertCurrency = () => {
    // Perform currency conversion using the fetched exchange rates
    if (fromCurrency in exchangeRates && toCurrency in exchangeRates) {
      const conversionRate = exchangeRates[toCurrency] / exchangeRates[fromCurrency];
      const result = amount * conversionRate;
      setConvertedAmount(result);
    } else {
      console.error('Invalid currency codes');
    }
  };

  return (
    <div style={styles.container}>
      <h1>Currency Converter</h1>
      <div style={styles.inputContainer}>
        <label>From Currency:</label>
        <select style={styles.input} value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
          {Object.keys(exchangeRates).map(currency => (
            <option key={currency} value={currency}>{currency}</option>
          ))}
        </select>
      </div>
      <div style={styles.inputContainer}>
        <label>To Currency:</label>
        <select style={styles.input} value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
          {Object.keys(exchangeRates).map(currency => (
            <option key={currency} value={currency}>{currency}</option>
          ))}
        </select>
      </div>
      <div style={styles.inputContainer}>
        <label>Amount:</label>
        <input type="number" style={styles.input} value={amount} onChange={(e) => setAmount(e.target.value)} />
      </div>
      <div style={styles.inputContainer}>
        <button style={styles.button} onClick={convertCurrency}>Convert</button>
      </div>
      {convertedAmount !== null && (
        <div style={styles.resultContainer}>
          <p style={styles.result}>Converted Amount: {convertedAmount}</p>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#ffffff',
    boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    borderRadius: '8px',
    width: '400px',
    margin: 'auto',
    marginTop: '50px',
  },
  inputContainer: {
    marginBottom: '15px',
  },
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '5px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    boxSizing: 'border-box',
  },
  button: {
    backgroundColor: '#007bff',
    color: '#ffffff',
    border: 'none',
    padding: '10px 15px',
    borderRadius: '4px',
    cursor: 'pointer',
    width: '100%',
  },
  buttonHover: {
    backgroundColor: '#0056b3',
  },
  resultContainer: {
    marginTop: '10px',
  },
  result: {
    fontSize: '18px',
    color: '#333333',
    textAlign: 'center',
  },
};

export default CurrencyConverter;
