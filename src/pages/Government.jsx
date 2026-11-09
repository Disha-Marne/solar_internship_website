import React from "react";
import { useNavigate } from "react-router-dom";
import "./Government.css";
import {
  Sun,
  Sprout,
  Home,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Zap,
  Sparkles
} from "lucide-react";

const Government = () => {
  const navigate = useNavigate();

  const schemes = [
    {
      id: "pm-surya-ghar",
      badge: "Residential Rooftop",
      badgeClass: "badge-residential",
      icon: Home,
      title: "PM Surya Ghar Yojana – Rooftop",
      headline: "Up to \u20B978,000 Subsidy",
      description:
        "Central Government initiative delivering direct capital subsidies for residential rooftop solar systems, reducing electricity bills and supplying up to 300 units of free solar power every month.",
      benefits: [
        "\u20B930,000 per kW for systems up to 2 kW capacity",
        "\u20B918,000 for additional 1 kW (Capped at \u20B978,000 for 3 kW+)",
        "Direct Benefit Transfer (DBT) to your bank account",
        "Bi-directional net metering with state DISCOM",
      ],
      ctaText: "Check Your Subsidy in Calculator",
      ctaAction: () => navigate("/calculator"),
    },
    {
      id: "pm-kusum",
      badge: "Agricultural & Rural",
      badgeClass: "badge-agriculture",
      icon: Sprout,
      title: "PM-KUSUM Yojana",
      headline: "Up to 60% Solar Subsidy",
      description:
        "Pradhan Mantri Kisan Urja Suraksha evam Utthaan Mahabhiyan supports farmers with standalone solar agricultural pumps and solarization of existing grid-connected agricultural pumps.",
      benefits: [
        "Up to 60% financial assistance from Central & State Govts",
        "Reliable daytime irrigation without dependency on diesel",
        "Opportunity to earn by selling surplus solar power to DISCOM",
        "De-dieselization and sustainable farm productivity",
      ],
      ctaText: "Enquire for PM-KUSUM",
      ctaAction: () => navigate("/contact"),
    },
    {
      id: "krushi-pump",
      badge: "State Agricultural Feeder",
      badgeClass: "badge-state",
      icon: Sun,
      title: "Krushi Pump Yojana",
      headline: "Subsidized Agriculture Pumping",
      description:
        "State-backed solar agriculture scheme designed to provide daytime dedicated 8-hour solar power supply to farm irrigation pumps with nominal farmer contribution.",
      benefits: [
        "Dedicated daytime solar power supply for farmland",
        "Subsidized solar pump connections for eligible farmers",
        "Eliminates late-night irrigation hazards",
        "Zero running fuel costs and long-term sustainability",
      ],
      ctaText: "Enquire for Krushi Pump",
      ctaAction: () => navigate("/contact"),
    },
  ];

  return (
    <div className="government-page-wrapper">
      {/* 1. Header Section */}
      <section className="gov-header-section">
        <div className="container gov-header-content">
          <div className="gov-header-badge">
            <ShieldCheck size={16} />
            <span>MNRE &amp; State Approved Assistance</span>
          </div>
          <h1 className="gov-main-title">Government Schemes</h1>
          <p className="gov-subtitle">
            Explore verified Central and State solar subsidy schemes that make clean energy affordable and accessible for homes and farms.
          </p>
        </div>
      </section>

      {/* 2. Three Schemes Cards Grid */}
      <section className="gov-schemes-section container">
        <div className="gov-cards-grid">
          {schemes.map((scheme) => {
            const Icon = scheme.icon;
            return (
              <div key={scheme.id} className="gov-scheme-card">
                <div className="gov-card-top">
                  <div className="gov-card-badge-row">
                    <span className={`gov-tag ${scheme.badgeClass}`}>
                      {scheme.badge}
                    </span>
                    <div className="gov-icon-wrap">
                      <Icon size={20} />
                    </div>
                  </div>
                  <h2 className="gov-scheme-title">{scheme.title}</h2>
                  <div className="gov-scheme-headline">{scheme.headline}</div>
                  <p className="gov-scheme-desc">{scheme.description}</p>
                </div>

                <div className="gov-card-middle">
                  <span className="gov-features-label">Key Highlights &amp; Benefits</span>
                  <ul className="gov-benefits-list">
                    {scheme.benefits.map((item, idx) => (
                      <li key={idx} className="gov-benefit-item">
                        <CheckCircle2 size={16} className="benefit-check-icon" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="gov-card-bottom">
                  <button
                    type="button"
                    className="gov-card-btn"
                    onClick={scheme.ctaAction}
                  >
                    <span>{scheme.ctaText}</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* 3. Compact PM Surya Ghar Subsidy Reference Slab */}
        <div className="gov-reference-card">
          <div className="gov-ref-header">
            <div className="gov-ref-title-wrap">
              <Zap size={18} className="ref-icon" />
              <h3>PM Surya Ghar Subsidy Structure (Residential)</h3>
            </div>
            <span className="gov-ref-note">National Portal Direct Benefit Transfer</span>
          </div>

          <div className="gov-table-wrapper">
            <table className="gov-slab-table">
              <thead>
                <tr>
                  <th>Monthly Consumption</th>
                  <th>Suitable System Size</th>
                  <th>Central Subsidy Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>0 – 150 units</td>
                  <td>1 – 2 kW</td>
                  <td>
                    <strong>{"\u20B9"}30,000 to {"\u20B9"}60,000</strong>
                  </td>
                </tr>
                <tr>
                  <td>150 – 300 units</td>
                  <td>2 – 3 kW</td>
                  <td>
                    <strong>{"\u20B9"}60,000 to {"\u20B9"}78,000</strong>
                  </td>
                </tr>
                <tr>
                  <td>Above 300 units</td>
                  <td>Above 3 kW</td>
                  <td>
                    <strong>{"\u20B9"}78,000 (Maximum Cap)</strong>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="gov-ref-footer">
            <Sparkles size={15} />
            <span>
              National Solar System provides full end-to-end assistance with portal registration, documentation, DISCOM net-metering approvals, and subsidy release.
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Government;
