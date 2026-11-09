import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Target,
  Eye,
  Sun,
  Home,
  Leaf,
  Wrench,
  Users,
  Cpu,
  Clock,
  Compass,
  Award,
  Check,
  Building2,
  Factory,
  CheckCircle
} from "lucide-react";
import "./About.css";

import homehouse from "../pics/homehouse.png";
import realon1 from "../pics/realon1.jpg";
import realon2 from "../pics/realon2.jpg";
import eco from "../pics/eco.png";

const About = () => {
  const navigate = useNavigate();

  const goToContact = () => {
    navigate("/contact");
  };

  const goToProjects = () => {
    navigate("/projects");
  };

  const goToCalculator = () => {
    navigate("/calculator");
  };

  return (
    <div className="about-editorial-page">
      {/* =========================================================================
          1. HERO SECTION: EDITORIAL SPLIT COMPOSITION
          Soft Sage & Mint Gradient Surface
          ========================================================================= */}
      <section className="about-hero-section">
        <div className="about-container hero-split-grid">
          {/* Left Text Column */}
          <div className="hero-text-col">
            <div className="editorial-pill pill-sage">
              <Sparkles size={14} className="pill-icon-amber" />
              <span>National Solar System • Pune &amp; PCMC</span>
            </div>

            <h1 className="hero-editorial-title">
              Powering a Brighter, Greener Tomorrow
            </h1>

            <p className="hero-editorial-intro">
              National Solar System delivers engineered rooftop solar installations
              for homes, commercial enterprises, and industrial facilities across
              Maharashtra. We combine Tier-1 technology, transparent feasibility
              consulting, and end-to-end subsidy facilitation to give property
              owners true energy independence.
            </p>

            <div className="hero-action-buttons">
              <button
                type="button"
                className="btn-editorial-primary"
                onClick={goToContact}
              >
                <span>Get Free Consultation</span>
                <ArrowRight size={17} />
              </button>
              <button
                type="button"
                className="btn-editorial-secondary"
                onClick={goToProjects}
              >
                <span>Explore Our Projects</span>
              </button>
            </div>

            <div className="hero-trust-strip">
              <div className="trust-strip-item">
                <Check size={15} className="trust-check-green" />
                <span>MNRE &amp; PM Surya Ghar Ready</span>
              </div>
              <div className="trust-strip-item">
                <Check size={15} className="trust-check-amber" />
                <span>550W Tier-1 Mono PERC</span>
              </div>
              <div className="trust-strip-item">
                <Check size={15} className="trust-check-green" />
                <span>DISCOM Net-Metering</span>
              </div>
            </div>
          </div>

          {/* Right Image Column: High Prominence Photo with Glass Floating Pill */}
          <div className="hero-image-col">
            <div className="hero-image-frame-wrapper">
              <div className="hero-backdrop-accent" aria-hidden="true"></div>
              <div className="hero-image-container">
                <img
                  src={homehouse}
                  alt="Solar Rooftop Installation by National Solar System"
                  className="hero-featured-photo"
                />
                <div className="hero-floating-badge">
                  <div className="floating-badge-icon icon-amber-bg">
                    <Sun size={20} className="icon-amber" />
                  </div>
                  <div className="floating-badge-text">
                    <strong>Tier-1 Photovoltaic Modules</strong>
                    <span>25-Year Performance Warranty</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. OUR STORY: BALANCED ASYMMETRIC TWO-COLUMN WITH WARM CREAM ACCENT
          ========================================================================= */}
      <section className="about-story-section">
        <div className="about-container story-asymmetric-grid">
          {/* Left Column: Text & Editorial Founder Profile */}
          <div className="story-content-col">
            <div className="section-label label-warm-cream">
              <span>Our Story &amp; Journey</span>
            </div>

            <h2 className="story-title">
              Engineering the Clean Energy Transition With Integrity
            </h2>

            <p className="story-lead">
              Founded in 2024, National Solar System was born out of a commitment
              to eliminate the confusion and technical friction surrounding rooftop
              solar adoption for everyday property owners in Maharashtra.
            </p>

            <p className="story-body">
              We specialize across the entire clean power spectrum—delivering
              high-performing on-grid residential systems under the PM Surya Ghar
              Muft Bijli Yojana, commercial setups that slash high daytime commercial
              tariffs, and industrial rooftop arrays engineered for heavy operational loads.
            </p>

            <div className="story-scope-row">
              <span className="scope-tag tag-residential">
                <Home size={14} /> Residential (1–10 kW)
              </span>
              <span className="scope-tag tag-commercial">
                <Building2 size={14} /> Commercial &amp; Retail
              </span>
              <span className="scope-tag tag-industrial">
                <Factory size={14} /> Industrial Plants
              </span>
            </div>

            {/* Editorial Founder Profile with Warm Cream Surface */}
            <div className="founder-editorial-profile">
              <div className="founder-quote-mark" aria-hidden="true">“</div>
              <p className="founder-quote">
                Solar energy is more than just panels on a roof—it represents financial
                security, predictable utility overheads, and active environmental
                responsibility for the next generation.
              </p>
              <div className="founder-signature-row">
                <div className="founder-avatar-small">
                  <img src={eco} alt="Aditya Gopale, Founder & CEO" />
                </div>
                <div className="founder-bio-text">
                  <h4 className="founder-name">Aditya Gopale</h4>
                  <span className="founder-title">Founder &amp; CEO • B.E. Mechanical Engineering</span>
                  <p className="founder-meta">
                    Over 2+ years of dedicated solar engineering experience leading technical design,
                    structural safety, and turnkey commissioning.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Balanced Real Photography Composition */}
          <div className="story-visuals-col">
            <div className="story-photography-stack">
              {/* Primary Large Image */}
              <div className="photo-primary-frame">
                <img
                  src={realon1}
                  alt="Real On-Site Solar Rooftop Installation by National Solar System"
                  className="photo-primary"
                />
                <div className="photo-caption-badge">
                  <Award size={15} className="text-amber" />
                  <span>On-Site Rooftop Array • Pune &amp; PCMC</span>
                </div>
              </div>

              {/* Supporting Secondary Row: Image + Milestone Card */}
              <div className="photo-secondary-row">
                <div className="photo-secondary-frame">
                  <img
                    src={realon2}
                    alt="Solar Module Assembly and Tilt Optimization"
                    className="photo-secondary"
                  />
                  <span className="photo-tag-badge">550W Mono PERC</span>
                </div>

                <div className="story-milestone-card">
                  <div className="milestone-icon-wrap">
                    <ShieldCheck size={20} className="text-forest" />
                  </div>
                  <div className="milestone-content">
                    <strong>100% DISCOM Compliant</strong>
                    <span>Turnkey net-metering approvals &amp; structural safety.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. MISSION AND VISION: TWO WIDE CONTRASTING PANELS
          Dark Forest-Green vs. Clean White Panel with Amber Details
          ========================================================================= */}
      <section className="about-mv-section">
        <div className="about-container">
          <div className="section-header-centered">
            <div className="section-label label-mint">
              <span>Guiding Principles</span>
            </div>
            <h2 className="section-title">Mission &amp; Vision</h2>
            <p className="section-subtitle">
              Distinct principles driving our engineering standards, customer consultation, and regional adoption.
            </p>
          </div>

          <div className="contrasting-panels-grid">
            {/* Panel 1: Dark Forest-Green Panel (Mission) */}
            <div className="mv-panel panel-dark-forest">
              <div className="panel-glow-accent" aria-hidden="true"></div>
              <div className="panel-badge-row">
                <span className="panel-kicker kicker-amber">Core Mission</span>
                <div className="panel-icon-wrap icon-amber-dark">
                  <Target size={28} className="text-amber" />
                </div>
              </div>
              <h3 className="panel-title">Our Mission</h3>
              <p className="panel-lead">
                To empower Indian homeowners and enterprises to transition smoothly to
                clean, self-generated electricity through honest consultation, precision
                engineering, and full government subsidy support.
              </p>
              <div className="panel-divider divider-light"></div>
              <ul className="panel-points">
                <li>
                  <CheckCircle2 size={17} className="panel-check-amber" />
                  <span>Transparent feasibility and load-matched rooftop plant design</span>
                </li>
                <li>
                  <CheckCircle2 size={17} className="panel-check-amber" />
                  <span>Zero-friction DBT subsidy processing under PM Surya Ghar &amp; MNRE</span>
                </li>
                <li>
                  <CheckCircle2 size={17} className="panel-check-amber" />
                  <span>Strict adherence to structural wind load engineering and electrical safety</span>
                </li>
              </ul>
            </div>

            {/* Panel 2: Light Neutral Panel with Amber & Solar Green Highlights (Vision) */}
            <div className="mv-panel panel-light-neutral">
              <div className="panel-glow-light" aria-hidden="true"></div>
              <div className="panel-badge-row">
                <span className="panel-kicker kicker-sage">Future Vision</span>
                <div className="panel-icon-wrap icon-solar-light">
                  <Eye size={28} className="text-solar" />
                </div>
              </div>
              <h3 className="panel-title text-forest">Our Vision</h3>
              <p className="panel-lead text-muted">
                To build a sustainable Maharashtra where clean, renewable solar power powers
                every rooftop—decoupling communities from escalating grid tariffs and
                speeding the transition to a zero-carbon future.
              </p>
              <div className="panel-divider divider-dark"></div>
              <ul className="panel-points">
                <li>
                  <CheckCircle2 size={17} className="panel-check-solar" />
                  <span>Accelerating distributed clean energy adoption for homes, shops, and factories</span>
                </li>
                <li>
                  <CheckCircle2 size={17} className="panel-check-solar" />
                  <span>Measurable environmental impact through verified lifetime carbon offsets</span>
                </li>
                <li>
                  <CheckCircle2 size={17} className="panel-check-solar" />
                  <span>Setting the benchmark for post-installation reliability and customer care</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. OUR IMPACT: EDITORIAL STATISTICS SECTION WITH COLOR ACCENTS
          Soft Sage Background with Alternating Green & Amber Statistics
          ========================================================================= */}
      <section className="about-impact-section">
        <div className="about-container">
          <div className="impact-editorial-header">
            <div className="impact-header-left">
              <div className="section-label label-sage">
                <span>Verified Milestones</span>
              </div>
              <h2 className="section-title">Our Impact in Numbers</h2>
            </div>
            <p className="impact-header-right">
              Concrete milestones achieved through engineering discipline, customer trust,
              and dedicated field execution across Maharashtra.
            </p>
          </div>

          <div className="editorial-stats-row">
            {/* Stat 1: Forest Green Accent */}
            <div className="stat-editorial-col stat-forest">
              <div className="stat-number num-forest">50+</div>
              <div className="stat-label label-forest">Installations</div>
              <p className="stat-desc">
                Completed rooftop solar systems across residential, commercial, and industrial sites.
              </p>
            </div>

            {/* Stat 2: Amber Accent */}
            <div className="stat-editorial-col stat-amber">
              <div className="stat-number num-amber">100+</div>
              <div className="stat-label label-amber">Solar Panels</div>
              <p className="stat-desc">
                High-efficiency 550W Tier-1 Mono PERC photovoltaic modules commissioned.
              </p>
            </div>

            {/* Stat 3: Solar Green Accent */}
            <div className="stat-editorial-col stat-solar">
              <div className="stat-number num-solar">50+</div>
              <div className="stat-label label-solar">Homes</div>
              <p className="stat-desc">
                Households enjoying clean energy and substantially reduced monthly electricity bills.
              </p>
            </div>

            {/* Stat 4: Amber/Environmental Accent */}
            <div className="stat-editorial-col stat-co2 last-col">
              <div className="stat-number num-amber">2,000+</div>
              <div className="stat-label label-forest">kg CO₂ Reduction</div>
              <p className="stat-desc">
                Estimated cumulative greenhouse gas emissions eliminated through solar generation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. WHY CHOOSE US: BALANCED 2x2 GRID WITH COORDINATED ICON BACKGROUNDS
          Clean White Surface with Sage, Cream, Mint & Amber Highlights
          ========================================================================= */}
      <section className="about-why-section">
        <div className="about-container">
          <div className="why-editorial-intro">
            <div className="section-label label-cream">
              <span>Our Strengths</span>
            </div>
            <h2 className="section-title">Why Property Owners Choose Us</h2>
            <p className="section-subtitle">
              We manage your solar project with technical rigor, consumer-first consultation, and lifelong accountability.
            </p>
          </div>

          <div className="why-pillars-grid">
            {/* Feature 1: Soft Sage Accent */}
            <div className="why-pillar-card card-sage">
              <div className="pillar-top-row">
                <span className="pillar-index-badge">01</span>
                <div className="pillar-icon-box bg-sage">
                  <Wrench size={22} className="text-forest" />
                </div>
              </div>
              <h3 className="pillar-title">Professional Solar Installation</h3>
              <p className="pillar-desc">
                Our certified installation crew conducts structural wind-load anchoring, calculates
                optimal panel tilt and azimuth, and installs neat, weather-shielded cable conduits.
              </p>
            </div>

            {/* Feature 2: Warm Cream Accent */}
            <div className="why-pillar-card card-cream">
              <div className="pillar-top-row">
                <span className="pillar-index-badge">02</span>
                <div className="pillar-icon-box bg-cream">
                  <Users size={22} className="text-amber" />
                </div>
              </div>
              <h3 className="pillar-title">Customer-Focused Consultation</h3>
              <p className="pillar-desc">
                We evaluate your historical power bills and rooftop shadow profiles to prescribe right-sized
                capacities, ensuring transparent ROI expectations without misleading claims or overselling.
              </p>
            </div>

            {/* Feature 3: Pale Mint Accent */}
            <div className="why-pillar-card card-mint">
              <div className="pillar-top-row">
                <span className="pillar-index-badge">03</span>
                <div className="pillar-icon-box bg-mint">
                  <Cpu size={22} className="text-solar" />
                </div>
              </div>
              <h3 className="pillar-title">Quality Equipment</h3>
              <p className="pillar-desc">
                We install exclusively MNRE-approved Tier-1 Mono PERC solar modules with 25-year performance
                warranties paired with reliable, high-efficiency grid-tied solar inverters.
              </p>
            </div>

            {/* Feature 4: Amber Tint Accent */}
            <div className="why-pillar-card card-amber">
              <div className="pillar-top-row">
                <span className="pillar-index-badge">04</span>
                <div className="pillar-icon-box bg-amber-soft">
                  <Clock size={22} className="text-amber-dark" />
                </div>
              </div>
              <h3 className="pillar-title">Reliable After-Installation Support</h3>
              <p className="pillar-desc">
                Our relationship continues beyond commissioning—we assist with DISCOM net-metering synchronization,
                portal subsidy disbursement tracking, and provide prompt maintenance support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          6. OUR PROCESS: CONNECTED 4-STEP TIMELINE ON PALE MINT BACKGROUND
          Coloured Numbered Nodes and Multi-Hue Connecting Track
          ========================================================================= */}
      <section className="about-process-section">
        <div className="about-container">
          <div className="section-header-centered">
            <div className="section-label label-mint">
              <span>Structured Pathway</span>
            </div>
            <h2 className="section-title">Our Process</h2>
            <p className="section-subtitle">
              A transparent, streamlined four-step workflow from initial evaluation to grid-connected generation.
            </p>
          </div>

          <div className="editorial-process-timeline">
            {/* Multi-Hue Connecting Track for Desktop */}
            <div className="timeline-track-desktop" aria-hidden="true"></div>

            <div className="process-steps-grid">
              {/* Step 1: Forest Green Node */}
              <div className="process-step-node node-forest">
                <div className="step-badge-circle circle-forest">
                  <span className="step-num">01</span>
                </div>
                <div className="step-body-card">
                  <span className="step-phase-tag tag-forest-phase">Initial Phase</span>
                  <h3 className="step-heading">Consultation</h3>
                  <p className="step-text">
                    Analysis of monthly power consumption, tariff structures, and preliminary feasibility and subsidy calculations.
                  </p>
                </div>
              </div>

              {/* Step 2: Solar Green Node */}
              <div className="process-step-node node-solar">
                <div className="step-badge-circle circle-solar">
                  <span className="step-num">02</span>
                </div>
                <div className="step-body-card">
                  <span className="step-phase-tag tag-solar-phase">Technical Survey</span>
                  <h3 className="step-heading">Site Assessment</h3>
                  <p className="step-text">
                    Rooftop structural inspection, shadow-free area measurement, electrical layout planning, and cable path mapping.
                  </p>
                </div>
              </div>

              {/* Step 3: Amber Node */}
              <div className="process-step-node node-amber">
                <div className="step-badge-circle circle-amber">
                  <span className="step-num">03</span>
                </div>
                <div className="step-body-card">
                  <span className="step-phase-tag tag-amber-phase">Execution</span>
                  <h3 className="step-heading">Solar Installation</h3>
                  <p className="step-text">
                    Hot-dip galvanized structure mounting, module wiring, inverter installation, earthing, and DISCOM liaison.
                  </p>
                </div>
              </div>

              {/* Step 4: Forest Green Node */}
              <div className="process-step-node node-forest">
                <div className="step-badge-circle circle-forest">
                  <span className="step-num">04</span>
                </div>
                <div className="step-body-card">
                  <span className="step-phase-tag tag-forest-phase">Commissioning</span>
                  <h3 className="step-heading">Ongoing Support</h3>
                  <p className="step-text">
                    Net-meter synchronization, National Portal subsidy documentation approval, and lifetime maintenance support.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          7. FINAL CTA: NATURAL PHOTOGRAPH WITH CHARCOAL OVERLAY & AMBER BUTTON
          ========================================================================= */}
      <section className="about-final-cta-wrapper about-container">
        <div
          className="final-cta-editorial-card"
          style={{ backgroundImage: `url(${homehouse})` }}
        >
          {/* Neutral Charcoal Overlay - Never a Green Tint */}
          <div className="final-cta-charcoal-overlay" aria-hidden="true"></div>

          <div className="final-cta-content">
            <div className="final-cta-badge">
              <Sparkles size={14} className="text-amber" />
              <span>Ready for Energy Independence?</span>
            </div>

            <h2 className="final-cta-headline">
              Let&apos;s Build a Sustainable Future Together
            </h2>

            <p className="final-cta-text">
              Whether you want to eliminate residential electric bills or reduce commercial
              operating overheads, our engineering team is ready to design your ideal solar solution.
            </p>

            <div className="final-cta-btn-group">
              <button
                type="button"
                className="btn-cta-amber"
                onClick={goToContact}
              >
                <span>Get Free Consultation</span>
                <ArrowRight size={17} />
              </button>
              <button
                type="button"
                className="btn-cta-outlined"
                onClick={goToCalculator}
              >
                <span>Calculate Solar Savings</span>
              </button>
            </div>

            <div className="final-cta-guarantees">
              <span>✓ PM Surya Ghar Subsidy Support</span>
              <span>✓ Zero-Obligation Rooftop Assessment</span>
              <span>✓ Complete DISCOM Liaison</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
