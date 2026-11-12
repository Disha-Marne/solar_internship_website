import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Projects.css';
import { ArrowRight, ExternalLink, Sparkles, CheckCircle2 } from 'lucide-react';

import homehouse from '../pics/homehouse.png';
import shop from '../pics/shop.png';
import industry from '../pics/industry.png';

const Projects = () => {
  const navigate = useNavigate();

  const handleProjectClick = (path) => {
    navigate(path);
  };

  return (
    <div className="projects-page-wrapper">
      {/* 1. Warm Off-White Header (Replaces heavy green gradient) */}
      <section className="projects-header-section">
        <div className="container projects-header-content">
          <div className="projects-eyebrow">
            <Sparkles size={14} className="eyebrow-sparkle" />
            <span>PROVEN TRACK RECORD</span>
          </div>

          <h1 className="projects-main-title">Our Solar Projects</h1>

          <p className="projects-subtitle">
            Explore our real-world solar installations across residential, commercial, and
            industrial sectors, delivering substantial savings and clean energy independence.
          </p>
        </div>
      </section>

      {/* 2. Premium Portfolio Cards Container */}
      <section className="projects-container container">
        <div className="projects-portfolio-list">

          {/* 1. Residential Project (Navigates to /house) */}
          <article className="portfolio-card card-residential">
            <div
              className="portfolio-image-wrapper"
              onClick={() => handleProjectClick('/house')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleProjectClick('/house');
                }
              }}
              aria-label="View Residential Solar Installation Details"
            >
              <img
                src={homehouse}
                alt="Residential Solar Panel Installation"
                className="portfolio-image"
              />
              <div className="portfolio-image-overlay">
                <span className="overlay-pill">
                  <ExternalLink size={15} />
                  <span>View Project</span>
                </span>
              </div>
            </div>

            <div className="portfolio-content">
              <div className="portfolio-meta-top">
                <span className="portfolio-tag tag-residential">Residential Rooftop</span>
                <span className="portfolio-capacity">3 – 10 kW On-Grid</span>
              </div>

              <h2
                className="portfolio-card-title clickable"
                onClick={() => handleProjectClick('/house')}
              >
                Residential Solar Panel Installation
              </h2>

              <p className="portfolio-description">
                Tailored on-grid rooftop solar systems for independent homes and housing societies,
                drastically cutting electricity bills and utilizing central PM Surya Ghar subsidies.
              </p>

              <div className="portfolio-specs-row">
                <span className="spec-pill">
                  <CheckCircle2 size={13} className="spec-check" /> PM Surya Ghar Ready
                </span>
                <span className="spec-pill">
                  <CheckCircle2 size={13} className="spec-check" /> Tier-1 550W Panels
                </span>
                <span className="spec-pill">
                  <CheckCircle2 size={13} className="spec-check" /> Net-Metering Liaison
                </span>
              </div>

              <div className="portfolio-actions">
                <button
                  type="button"
                  className="btn-portfolio-action"
                  onClick={() => handleProjectClick('/house')}
                >
                  <span>View Project Details</span>
                  <ArrowRight size={16} className="btn-arrow" />
                </button>
              </div>
            </div>
          </article>

          {/* 2. Commercial Project (Navigates to /contact) */}
          <article className="portfolio-card card-commercial">
            <div
              className="portfolio-image-wrapper"
              onClick={() => handleProjectClick('/contact')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleProjectClick('/contact');
                }
              }}
              aria-label="Enquire for Commercial Solar Installation"
            >
              <img
                src={shop}
                alt="Commercial Solar Panel Installation"
                className="portfolio-image"
              />
              <div className="portfolio-image-overlay">
                <span className="overlay-pill">
                  <ExternalLink size={15} />
                  <span>View Project</span>
                </span>
              </div>
            </div>

            <div className="portfolio-content">
              <div className="portfolio-meta-top">
                <span className="portfolio-tag tag-commercial">Commercial Setup</span>
                <span className="portfolio-capacity">10 – 50 kW Grid-Tied</span>
              </div>

              <h2
                className="portfolio-card-title clickable"
                onClick={() => handleProjectClick('/contact')}
              >
                Commercial Solar Installation
              </h2>

              <p className="portfolio-description">
                High-capacity rooftop installations for retail stores, offices, and commercial
                establishments designed to lower high daytime commercial tariff charges.
              </p>

              <div className="portfolio-specs-row">
                <span className="spec-pill">
                  <CheckCircle2 size={13} className="spec-check" /> Tariff Cost Reduction
                </span>
                <span className="spec-pill">
                  <CheckCircle2 size={13} className="spec-check" /> Smart Metering
                </span>
                <span className="spec-pill">
                  <CheckCircle2 size={13} className="spec-check" /> Retail &amp; Office Complexes
                </span>
              </div>

              <div className="portfolio-actions">
                <button
                  type="button"
                  className="btn-portfolio-action"
                  onClick={() => handleProjectClick('/contact')}
                >
                  <span>Get Commercial Quote</span>
                  <ArrowRight size={16} className="btn-arrow" />
                </button>
              </div>
            </div>
          </article>

          {/* 3. Industrial Project (Navigates to /contact) */}
          <article className="portfolio-card card-industrial">
            <div
              className="portfolio-image-wrapper"
              onClick={() => handleProjectClick('/contact')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleProjectClick('/contact');
                }
              }}
              aria-label="Enquire for Industrial Solar Installation"
            >
              <img
                src={industry}
                alt="Industrial Solar Panel Installation"
                className="portfolio-image"
              />
              <div className="portfolio-image-overlay">
                <span className="overlay-pill">
                  <ExternalLink size={15} />
                  <span>View Project</span>
                </span>
              </div>
            </div>

            <div className="portfolio-content">
              <div className="portfolio-meta-top">
                <span className="portfolio-tag tag-industrial">Industrial Plant</span>
                <span className="portfolio-capacity">50 kW – MW Scale</span>
              </div>

              <h2
                className="portfolio-card-title clickable"
                onClick={() => handleProjectClick('/contact')}
              >
                Industrial Solar Installation
              </h2>

              <p className="portfolio-description">
                Heavy-duty MW-scale solar solutions for manufacturing plants, warehouses, and factories,
                maximizing accelerated depreciation benefits and operating efficiency.
              </p>

              <div className="portfolio-specs-row">
                <span className="spec-pill">
                  <CheckCircle2 size={13} className="spec-check" /> Accelerated Depreciation
                </span>
                <span className="spec-pill">
                  <CheckCircle2 size={13} className="spec-check" /> High-Load Durability
                </span>
                <span className="spec-pill">
                  <CheckCircle2 size={13} className="spec-check" /> Factory &amp; Warehouse Proof
                </span>
              </div>

              <div className="portfolio-actions">
                <button
                  type="button"
                  className="btn-portfolio-action"
                  onClick={() => handleProjectClick('/contact')}
                >
                  <span>Get Industrial Quote</span>
                  <ArrowRight size={16} className="btn-arrow" />
                </button>
              </div>
            </div>
          </article>

        </div>
      </section>
    </div>
  );
};

export default Projects;
