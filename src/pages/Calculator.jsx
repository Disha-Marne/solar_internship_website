// Calculator.jsx
import React, { useState } from "react";
import axios from "axios";
import "./Calculator.css";
import solarHouse from "../pics/homehouse.png";
const API_URL = import.meta.env.VITE_API_URL;

const Calculator = () => {
  const [unitsUsed, setUnitsUsed] = useState('');
  const [billAmount, setBillAmount] = useState('');
  const [roofSize, setRoofSize] = useState('');
  const [roofType, setRoofType] = useState('');
  const [results, setResults] = useState({
    systemSize: '--',
    roi: '--',
    panels: '--',
    saving: '--',
    investment: '--',
  });
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const clearInputs = () => {
    setUnitsUsed('');
    setBillAmount('');
    setRoofSize('');
    setRoofType('');
    setError('');
    setSuccessMsg('');
    setResults({
      systemSize: '--',
      roi: '--',
      panels: '--',
      saving: '--',
      investment: '--',
    });
  };

  const calculateSolar = async () => {
    setError('');
    setSuccessMsg('');
    setLoading(true);

    const u = parseFloat(unitsUsed);
    const b = parseFloat(billAmount);
    const r = parseFloat(roofSize);

    if (isNaN(u) || u <= 0 || isNaN(b) || b <= 0 || isNaN(r) || r <= 0 || !roofType) {
      setError("Please fill in all fields with positive numbers and select a roof type.");
      setLoading(false);
      return;
    }

    const COST_PER_KW = 60000;
    const PANEL_WATTAGE = 550;
    const PANEL_SIZE_SQFT = 28;

    const systemSize_kW = u / 120;
    const panelsRequired = Math.ceil((systemSize_kW * 1000) / PANEL_WATTAGE);
    const roofAreaRequired = panelsRequired * PANEL_SIZE_SQFT;

    if (roofAreaRequired > r) {
      setError(`Not enough roof space! Need ~${Math.ceil(roofAreaRequired)} sq.ft for ${panelsRequired} panels.`);
      setResults({ systemSize: systemSize_kW.toFixed(2), roi: '--', panels: panelsRequired, saving: '--', investment: '--' });
      setLoading(false);
      return;
    }

    const systemAmount = systemSize_kW * COST_PER_KW;
    const roiYears = (systemAmount / (b * 12)).toFixed(1);
    const annualSaving = Math.round(b * 12);

    const resultData = {
      systemSize: `${systemSize_kW.toFixed(2)} kW`,
      investment: `₹${systemAmount.toLocaleString("en-IN")}`,
      roi: `${roiYears} years`,
      panels: panelsRequired,
      saving: `₹${annualSaving.toLocaleString("en-IN")}`,
    };

    setResults(resultData);

    try {
      const response = await fetch(`${API_URL}/api/calculator`, {
        unitsUsed: u,
        billAmount: b,
        roofSize: r,
        roofType,
        ...resultData
      });

      if (response.data.message) setSuccessMsg(response.data.message);

    } catch (err) {
      console.error("Backend error:", err);
      setError("Server not responding. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="home-page">
      <section className="hero-section" style={{ backgroundImage: `url(${solarHouse})` }}>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>Power Your Future with Solar Energy</h1>
          <p>Clean, affordable, and sustainable energy for every home and business.</p>
        </div>
      </section>

      <section id="calculator" className="calculator-hero-overlay">
        <div className="calculator-card">
          <div className="calculator-left">
            <h2>Solar Calculator</h2>
            <div className="calc-input-group">
              <input type="number" placeholder="Monthly Units (kWh)" value={unitsUsed} onChange={e => setUnitsUsed(e.target.value)} min="0" />
              <input type="number" placeholder="Monthly Bill (₹)" value={billAmount} onChange={e => setBillAmount(e.target.value)} min="0" />
              <input type="number" placeholder="Roof Area (sq. ft)" value={roofSize} onChange={e => setRoofSize(e.target.value)} min="0" />
              <select value={roofType} onChange={e => setRoofType(e.target.value)}>
                <option value="" disabled>Select Roof Type</option>
                <option value="flat">Flat Roof</option>
                <option value="pitched">Pitched Roof</option>
                <option value="terrace">Terrace</option>
              </select>

              <div className="calc-btn-container">
                <button className="calc-btn" onClick={calculateSolar} disabled={loading}>
                  {loading ? "⏳ Calculating..." : "Start Calculation"}
                </button>
                <button className="clear-btn" onClick={clearInputs} disabled={loading}>Clear</button>
              </div>
            </div>

            {error && <p className="error-msg">{error}</p>}
            {successMsg && <p className="success-msg">{successMsg}</p>}
          </div>

          <div className="calculator-right">
            <div>System Size (kW): <span>{results.systemSize}</span></div>
            <div>Initial Investment: <span>{results.investment}</span></div>
            <div>ROI (Years): <span>{results.roi}</span></div>
            <div>No. of Panels: <span>{results.panels}</span></div>
            <div>Annual Saving: <span>{results.saving}</span></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Calculator;