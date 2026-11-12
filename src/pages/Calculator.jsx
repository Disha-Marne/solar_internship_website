// Calculator.jsx
import React, { useState } from "react";
import axios from "axios";
import "./Calculator.css";
import solarHouse from "../pics/homehouse.png";
import {
  Zap,
  IndianRupee,
  Clock,
  Layers,
  PiggyBank,
  Home,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Building2,
  Check,
  Info,
  Sun,
  TrendingUp,
  Award
} from "lucide-react";

const rawApiUrl = import.meta.env.VITE_API_URL || "https://solar-internship-website.onrender.com";
const API_URL = rawApiUrl.replace(/\/+$/, "");

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

    const systemAmount = Math.round(systemSize_kW * COST_PER_KW);
    const roiYears = (systemAmount / (b * 12)).toFixed(1);
    const annualSaving = Math.round(b * 12);

    const resultData = {
      systemSize: `${systemSize_kW.toFixed(2)} kW`,
      investment: `\u20B9${systemAmount.toLocaleString("en-IN")}`,
      roi: `${roiYears} years`,
      panels: panelsRequired,
      saving: `\u20B9${annualSaving.toLocaleString("en-IN")}`,
    };

    setResults(resultData);

    try {
      const response = await fetch(`${API_URL}/api/calculator`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          unitsUsed: u,
          billAmount: b,
          roofSize: r,
          roofType,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data);
        setSuccessMsg("Calculation saved successfully!");
      } else {
        setError(data.message || "Calculation failed");
      }

    } catch (error) {
      console.error("Backend error:", error);
      alert("Server not responding. Please try again.");
    }

    setLoading(false);
  };

  const hasCalculated = results.systemSize !== '--';
  const isFullSuccess = hasCalculated && results.investment !== '--';
  const panelsCount = typeof results.panels === 'number' ? results.panels : parseInt(results.panels, 10);
  const requiredRoofArea = !isNaN(panelsCount) && panelsCount > 0 ? panelsCount * 28 : 0;
  const availableRoofArea = parseFloat(roofSize) || 0;
  const isFeasible = isFullSuccess && availableRoofArea > 0 && requiredRoofArea <= availableRoofArea;
  const utilizationPercentage = isFeasible && availableRoofArea > 0
    ? Math.min(100, Math.round((requiredRoofArea / availableRoofArea) * 100))
    : 0;

  const numericBill = parseFloat(billAmount) || 0;

  return (
    <div className="calculator-page-wrapper">
      {/* 1. Hero Banner */}
      <section className="calc-hero-section" style={{ backgroundImage: `url(${solarHouse})` }}>
        <div className="calc-hero-overlay"></div>
        <div className="container calc-hero-content">
          <div className="calc-hero-badge">
            <Sparkles size={15} />
            <span>Smart Solar Assessment</span>
          </div>
          <h1>Power Your Future with Solar Energy</h1>
          <p>
            Evaluate your rooftop solar capacity, investment requirement, annual bill savings, and payback period in seconds.
          </p>

          <div className="calc-hero-trust-pills">
            <span className="hero-pill"><Check size={14} /> 550W Tier-1 Panels</span>
            <span className="hero-pill"><Check size={14} /> {`\u20B9`}60,000 / kW Benchmark</span>
            <span className="hero-pill"><Check size={14} /> PM Surya Ghar Subsidy Ready</span>
          </div>
        </div>
      </section>

      {/* 2. Main 50:50 Calculator Workspace */}
      <section id="calculator" className="calc-main-section container">
        <div className="calculator-workspace-card">

          {/* LEFT 50%: Calculator Form */}
          <div className="calc-form-column">
            <div className="column-header">
              <span className="column-step-badge">Step 1: Consumption & Roof</span>
              <h2>Rooftop & Bill Inputs</h2>
              <p>Enter your electricity consumption and available area to assess feasibility.</p>
            </div>

            <div className="calc-inputs-grid">
              {/* Field 1: Monthly Units */}
              <div className="calc-field-group">
                <div className="calc-label-row">
                  <label htmlFor="unitsUsed" className="calc-label">
                    <span className="label-icon"><Zap size={15} /></span>
                    Average Monthly Units
                  </label>
                  <span className="field-required">*Required</span>
                </div>
                <div className="calc-input-wrapper">
                  <input
                    id="unitsUsed"
                    type="number"
                    placeholder="e.g. 350"
                    value={unitsUsed}
                    onChange={e => setUnitsUsed(e.target.value)}
                    min="0"
                    step="any"
                    className="calc-input-field"
                    aria-describedby="unitsUsed-hint"
                  />
                  <span className="input-adornment">kWh</span>
                </div>
                <span id="unitsUsed-hint" className="field-hint">Average units consumed per month</span>
              </div>

              {/* Field 2: Monthly Bill */}
              <div className="calc-field-group">
                <div className="calc-label-row">
                  <label htmlFor="billAmount" className="calc-label">
                    <span className="label-icon"><IndianRupee size={15} /></span>
                    Monthly Bill
                  </label>
                  <span className="field-required">*Required</span>
                </div>
                <div className="calc-input-wrapper">
                  <span className="input-prefix">{`\u20B9`}</span>
                  <input
                    id="billAmount"
                    type="number"
                    placeholder="e.g. 2500"
                    value={billAmount}
                    onChange={e => setBillAmount(e.target.value)}
                    min="0"
                    step="any"
                    className="calc-input-field has-prefix"
                    aria-describedby="billAmount-hint"
                  />
                </div>
                <span id="billAmount-hint" className="field-hint">Average monthly electricity bill</span>
              </div>

              {/* Field 3: Roof Area */}
              <div className="calc-field-group full-width-field">
                <div className="calc-label-row">
                  <label htmlFor="roofSize" className="calc-label">
                    <span className="label-icon"><Home size={15} /></span>
                    Available Rooftop Area
                  </label>
                  <span className="field-required">*Required</span>
                </div>
                <div className="calc-input-wrapper">
                  <input
                    id="roofSize"
                    type="number"
                    placeholder="e.g. 450"
                    value={roofSize}
                    onChange={e => setRoofSize(e.target.value)}
                    min="0"
                    step="any"
                    className="calc-input-field"
                    aria-describedby="roofSize-hint"
                  />
                  <span className="input-adornment">sq. ft</span>
                </div>
                <span id="roofSize-hint" className="field-hint">Total shadow-free rooftop or terrace space</span>
              </div>

              {/* Field 4: Roof Structure Type */}
              <div className="calc-field-group full-width-field roof-type-field-group">
                <div className="calc-label-row">
                  <label className="calc-label" id="roofType-label">
                    <span className="label-icon"><Layers size={15} /></span>
                    Roof Structure Type
                  </label>
                  <span className="field-required">*Required</span>
                </div>

                {/* Visual Roof Type Selection Cards */}
                <div
                  className="roof-type-cards-grid"
                  role="radiogroup"
                  aria-labelledby="roofType-label"
                >
                  {[
                    {
                      id: 'Tin Shed',
                      label: 'Tin Shed',
                      desc: 'Metal or corrugated shed',
                      icon: Building2
                    },
                    {
                      id: 'RCC Terrace',
                      label: 'RCC Terrace',
                      desc: 'Flat concrete terrace',
                      icon: Home
                    },
                    {
                      id: 'Sloped Roof',
                      label: 'Sloped Roof',
                      desc: 'Tiled or angled rooftop',
                      icon: Layers
                    }
                  ].map((item) => {
                    const Icon = item.icon;
                    const isSelected = roofType === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        role="radio"
                        aria-checked={isSelected}
                        className={`roof-type-card ${isSelected ? 'is-selected' : ''}`}
                        onClick={() => setRoofType(item.id)}
                      >
                        <div className="roof-card-header">
                          <div className={`roof-icon-box ${isSelected ? 'icon-active' : ''}`}>
                            <Icon size={16} />
                          </div>
                          <div className={`roof-radio-check ${isSelected ? 'check-active' : ''}`}>
                            {isSelected && <Check size={11} strokeWidth={3} />}
                          </div>
                        </div>
                        <div className="roof-card-content">
                          <span className="roof-card-title">{item.label}</span>
                          <span className="roof-card-desc">{item.desc}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
                <span className="field-hint">Select the structural roof type for mounting structure optimization</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="calc-action-row">
              <button
                type="button"
                className="btn-primary-calculate"
                onClick={calculateSolar}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner"></span>
                    <span>Analyzing Feasibility...</span>
                  </>
                ) : (
                  <>
                    <span>Calculate Solar System</span>
                    <ArrowRight size={17} className="btn-arrow" />
                  </>
                )}
              </button>

              <button
                type="button"
                className="btn-ghost-clear"
                onClick={clearInputs}
                disabled={loading}
                title="Reset calculator inputs"
              >
                <RotateCcw size={15} />
                <span>Clear</span>
              </button>
            </div>

            {/* Error Banner */}
            {error && (
              <div className="calc-alert-banner alert-error" role="alert">
                <AlertCircle size={18} className="alert-icon" />
                <div className="alert-text">
                  <strong>Notice:</strong> {error}
                </div>
              </div>
            )}

            {/* Success Banner */}
            {successMsg && (
              <div className="calc-alert-banner alert-success" role="alert">
                <CheckCircle2 size={18} className="alert-icon" />
                <div className="alert-text">
                  <strong>Success:</strong> {successMsg}
                </div>
              </div>
            )}

            {/* Trust Subsidy Banner on Left */}
            <div className="form-trust-banner">
              <ShieldCheck size={18} className="trust-shield-icon" />
              <span>Standard MNRE Factor (120 units/kW/mo) &amp; PM Surya Ghar Ready</span>
            </div>
          </div>

          {/* RIGHT 50%: Results Dashboard */}
          <div className="calc-results-column">
            <div className="column-header">
              <div className="results-header-left">
                <span className="column-step-badge badge-accent">Step 2: Results &amp; ROI</span>
                <h2>Results Dashboard</h2>
                <p>Personalized projection based on Tier-1 550W solar modules.</p>
              </div>
              <span className={`results-status-badge ${isFullSuccess ? 'status-active' : hasCalculated ? 'status-infeasible' : ''}`}>
                {isFullSuccess ? "Feasible" : hasCalculated ? "Infeasible" : "Awaiting Input"}
              </span>
            </div>

            {/* 6 Balanced KPI Cards (2 Columns x 3 Rows) */}
            <div className="kpi-cards-grid">

              {/* KPI 1: Recommended System Capacity */}
              <div className={`kpi-card ${isFullSuccess ? 'kpi-highlight-green' : ''}`}>
                <div className="kpi-icon-wrap icon-green">
                  <Zap size={20} />
                </div>
                <div className="kpi-details">
                  <span className="kpi-label">Recommended Capacity</span>
                  <div className="kpi-value">{results.systemSize}</div>
                  <span className="kpi-sub">Plant capacity based on load</span>
                </div>
              </div>

              {/* KPI 2: Estimated Investment */}
              <div className="kpi-card">
                <div className="kpi-icon-wrap icon-forest">
                  <IndianRupee size={20} />
                </div>
                <div className="kpi-details">
                  <span className="kpi-label">Estimated Investment</span>
                  <div className="kpi-value">{results.investment}</div>
                  <span className="kpi-sub">Benchmark @ {`\u20B9`}60,000/kW</span>
                </div>
              </div>

              {/* KPI 3: Annual Savings */}
              <div className={`kpi-card ${isFullSuccess ? 'kpi-highlight-gold' : ''}`}>
                <div className="kpi-icon-wrap icon-gold">
                  <PiggyBank size={20} />
                </div>
                <div className="kpi-details">
                  <span className="kpi-label">Annual Savings</span>
                  <div className="kpi-value">{results.saving}</div>
                  <span className="kpi-sub">Direct bill savings per year</span>
                </div>
              </div>

              {/* KPI 4: Payback Period */}
              <div className="kpi-card">
                <div className="kpi-icon-wrap icon-amber">
                  <Clock size={20} />
                </div>
                <div className="kpi-details">
                  <span className="kpi-label">Payback Period (ROI)</span>
                  <div className="kpi-value">{results.roi}</div>
                  <span className="kpi-sub">Full cost recovery time</span>
                </div>
              </div>

              {/* KPI 5: Number of Panels */}
              <div className="kpi-card">
                <div className="kpi-icon-wrap icon-teal">
                  <Layers size={20} />
                </div>
                <div className="kpi-details">
                  <span className="kpi-label">Panels Required</span>
                  <div className="kpi-value">
                    {hasCalculated && !isNaN(panelsCount) ? `${panelsCount} Panels` : '--'}
                  </div>
                  <span className="kpi-sub">550W Mono PERC modules</span>
                </div>
              </div>

              {/* KPI 6: Required Roof Area */}
              <div className="kpi-card">
                <div className="kpi-icon-wrap icon-blue">
                  <Home size={20} />
                </div>
                <div className="kpi-details">
                  <span className="kpi-label">Required Roof Area</span>
                  <div className="kpi-value">
                    {hasCalculated && requiredRoofArea > 0 ? `${requiredRoofArea} sq. ft` : '--'}
                  </div>
                  <span className="kpi-sub">28 sq. ft shadow-free/panel</span>
                </div>
              </div>

            </div>

            {/* Roof Feasibility Status & Meter */}
            {hasCalculated ? (
              <div className={`rooftop-meter-card ${isFeasible ? 'meter-feasible' : 'meter-infeasible'}`}>
                <div className="meter-header">
                  <div className="meter-title-wrap">
                    {isFeasible ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
                    <span className="meter-title">
                      {isFeasible ? "Rooftop Feasibility: Suitable & Optimal" : "Rooftop Feasibility: Insufficient Space"}
                    </span>
                  </div>
                  {isFeasible && <span className="meter-percentage">{utilizationPercentage}% Roof Area Utilized</span>}
                </div>

                {isFeasible ? (
                  <>
                    <div className="meter-progress-track">
                      <div
                        className="meter-progress-fill"
                        style={{ width: `${Math.min(100, utilizationPercentage)}%` }}
                      ></div>
                    </div>
                    <div className="meter-footer">
                      <span>Area Needed: <strong>~{requiredRoofArea} sq. ft</strong></span>
                      <span>Available: <strong>{roofSize} sq. ft</strong></span>
                      <span>Surplus Space: <strong>~{Math.max(0, availableRoofArea - requiredRoofArea)} sq. ft</strong></span>
                    </div>
                  </>
                ) : (
                  <div className="meter-infeasible-notice">
                    <p>
                      Required Area: <strong>~{requiredRoofArea} sq. ft</strong> | Available Area: <strong>{roofSize} sq. ft</strong>
                    </p>
                    <span className="shortfall-text">
                      Need ~{Math.ceil(requiredRoofArea - availableRoofArea)} sq. ft additional shadow-free space for {panelsCount} panels.
                    </span>
                  </div>
                )}
              </div>
            ) : (
              /* Polished Empty State for Feasibility */
              <div className="rooftop-meter-placeholder">
                <div className="placeholder-icon">
                  <Info size={18} />
                </div>
                <div className="placeholder-text">
                  <strong>Roof Feasibility &amp; Sizing</strong>
                  <p>Enter your monthly bill and rooftop area on the left to calculate required panels and verify space feasibility.</p>
                </div>
              </div>
            )}

            {/* Savings / Financial Breakdown (Active State) */}
            {isFullSuccess && numericBill > 0 ? (
              <div className="financial-breakdown-card">
                <div className="breakdown-header">
                  <TrendingUp size={16} className="breakdown-header-icon" />
                  <span>Cumulative Savings Projection</span>
                </div>
                <div className="breakdown-grid">
                  <div className="breakdown-item">
                    <span className="breakdown-label">1-Year Savings</span>
                    <strong className="breakdown-val">{results.saving}</strong>
                  </div>
                  <div className="breakdown-item">
                    <span className="breakdown-label">5-Year Savings</span>
                    <strong className="breakdown-val">{`\u20B9`}{Math.round(numericBill * 12 * 5).toLocaleString("en-IN")}</strong>
                  </div>
                  <div className="breakdown-item">
                    <span className="breakdown-label">10-Year Savings</span>
                    <strong className="breakdown-val">{`\u20B9`}{Math.round(numericBill * 12 * 10).toLocaleString("en-IN")}</strong>
                  </div>
                </div>
              </div>
            ) : (
              /* Polished Empty State Instructions */
              <div className="empty-state-guide-card">
                <div className="guide-title-row">
                  <Award size={16} className="guide-icon" />
                  <span>What You Get After Calculating:</span>
                </div>
                <div className="guide-chips-row">
                  <span className="guide-chip"><Check size={12} /> Exact System Sizing (kW)</span>
                  <span className="guide-chip"><Check size={12} /> Total 550W Module Count</span>
                  <span className="guide-chip"><Check size={12} /> Rooftop Feasibility Check</span>
                  <span className="guide-chip"><Check size={12} /> ROI &amp; Payback Period</span>
                </div>
              </div>
            )}

          </div>

        </div>
      </section>
    </div>
  );
};

export default Calculator;
