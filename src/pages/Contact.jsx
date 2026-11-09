import React, { useState } from "react";
import { ChevronDown, MapPin, Phone, Mail, Clock, Send, Sparkles, Sun } from "lucide-react";
import "./Contact.css";
import businessMeetingImg from "../pics/contact.png";

const rawApiUrl = import.meta.env.VITE_API_URL || "https://solar-internship-website.onrender.com";
const API_URL = rawApiUrl.replace(/\/+$/, "");

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    consumerNumber: "",
    query: ""
  });

  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(prev => (prev === index ? null : index));
  };

  const faqs = [
    {
      question: "How much subsidy can I get under the PM Surya Ghar Muft Bijli Yojana?",
      answer: "Under the PM Surya Ghar Yojana, residential homeowners receive \u20B930,000 per kW for up to 2 kW, and \u20B918,000 for the 3rd kW, capping at \u20B978,000 for systems 3 kW and above. Subsidies are transferred directly to your bank account via the National Portal after DISCOM meter installation."
    },
    {
      question: "How much shadow-free rooftop area is required for a solar system?",
      answer: "As a rule of thumb, every 1 kW of solar capacity requires approximately 80 to 100 sq. ft of shadow-free rooftop space. Using our high-efficiency 550W Tier-1 modules, each panel requires only 28 sq. ft."
    },
    {
      question: "How does Net Metering work with my electricity bill?",
      answer: "A bi-directional net meter records both the power you draw from the grid and the excess solar electricity exported to the grid. Your monthly bill reflects only the 'net' units consumed. If you export more than you consume, surplus credits roll over to the next billing cycle."
    },
    {
      question: "What is the expected lifespan and warranty of solar panels?",
      answer: "Tier-1 Mono PERC solar panels have an operating lifespan of 25 to 30 years and come with a 25-year linear performance warranty. Inverters typically carry 5 to 10 years of manufacturer warranty."
    },
    {
      question: "How long does the complete installation and approval process take?",
      answer: "Physical installation of rooftop mounting structures and panels takes just 2 to 4 days. The complete administrative process—including site survey, DISCOM application, net-meter approval, and subsidy inspection—typically takes 2 to 4 weeks."
    }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "name" && /[^a-zA-Z\s]/.test(value)) return;
    if ((name === "phone" || name === "consumerNumber") && /[^0-9]/.test(value)) return;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!/^[a-zA-Z\s]{2,}$/.test(formData.name)) { alert("Name must contain only letters and at least 2 characters."); return; }
    if (!/^[6-9]\d{9}$/.test(formData.phone)) { alert("Phone must be 10 digits and start with 6-9."); return; }
    if (!/^\d{6,15}$/.test(formData.consumerNumber)) { alert("Consumer number must be 6-15 digits."); return; }
    if (!/.+@.+\..+/.test(formData.email)) { alert("Please enter a valid email address."); return; }
    if (formData.query.trim().length < 5) { alert("Query must be at least 5 characters."); return; }

    try {
      const response = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        alert("Form submitted successfully!");
        setFormData({ name: "", email: "", phone: "", consumerNumber: "", query: "" });
      } else {
        alert(data.message || "Submission failed");
      }
    } catch (error) {
      console.error("Contact Error:", error);
      alert("Server not responding. Please try again.");
    }
  };

  return (
    <div className="contact-page-wrapper">
      {/* 1. Page Header */}
      <section className="contact-hero-banner">
        <div className="contact-hero-shape" aria-hidden="true" />
        <div className="contact-hero-shape-left" aria-hidden="true" />
        <div className="container contact-hero-content">
          <div className="contact-hero-badge">
            <Sparkles size={14} className="eyebrow-sparkle" />
            <span>LET'S TALK SOLAR</span>
          </div>
          <h1 className="contact-main-title">
            Get in Touch <span className="contact-title-highlight">With Us</span>
          </h1>
          <div className="contact-title-divider" aria-hidden="true">
            <span className="divider-line" />
            <Sun size={15} className="divider-sun-icon" />
            <span className="divider-line" />
          </div>
          <p className="contact-subtitle">
            Have questions about solar installation, subsidy paperwork, or feasibility? Our technical team is ready to assist you.
          </p>
        </div>
      </section>

      <section className="contact-main-content container">
        {/* 2. Form & Info Grid */}
        <div className="contact-content-grid">
          {/* Left Column: Form */}
          <div className="contact-left-column">
            <div className="enquiry-form-card">
              <div className="form-card-header">
                <h2>Enquire Now</h2>
                <p>Fill out the form below and we will contact you within 24 hours.</p>
              </div>

              <form className="enquiry-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Full Name *</label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      placeholder="e.g. Rahul Sharma"
                      className="form-input"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      placeholder="e.g. rahul@example.com"
                      className="form-input"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number *</label>
                    <input
                      id="phone"
                      type="tel"
                      name="phone"
                      placeholder="10-digit mobile number"
                      className="form-input"
                      value={formData.phone}
                      onChange={handleChange}
                      maxLength="10"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="consumerNumber">Electricity Consumer No. *</label>
                    <input
                      id="consumerNumber"
                      type="text"
                      name="consumerNumber"
                      placeholder="From your electricity bill"
                      className="form-input"
                      value={formData.consumerNumber}
                      onChange={handleChange}
                      maxLength="15"
                      required
                    />
                  </div>
                </div>

                <div className="form-group full-width">
                  <label htmlFor="query">Your Query or Requirement *</label>
                  <textarea
                    id="query"
                    name="query"
                    placeholder="Tell us about your rooftop area, monthly power consumption, or questions..."
                    className="form-input query-box"
                    value={formData.query}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-action-row">
                  <button type="submit" className="btn-submit-contact">
                    <span>Submit Enquiry</span>
                    <Send size={16} />
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Right Column: Image & Contact Info */}
          <div className="contact-right-column">
            <div className="contact-details-card">
              <div className="contact-image-wrapper">
                <img src={businessMeetingImg} alt="Solar Consultation" className="contact-image" />
              </div>

              <div className="contact-info-content">
                <h3>Contact Information</h3>
                <p className="contact-info-desc">Reach out directly via phone, email, or visit our office.</p>

                <ul className="contact-info-list">
                  <li>
                    <div className="info-icon-box">
                      <MapPin size={18} />
                    </div>
                    <div>
                      <strong>Office Address</strong>
                      <span>Nigdi, Pune, Maharashtra 411044</span>
                    </div>
                  </li>
                  <li>
                    <div className="info-icon-box">
                      <Phone size={18} />
                    </div>
                    <div>
                      <strong>Phone Support</strong>
                      <span>+91 91194 77479</span>
                    </div>
                  </li>
                  <li>
                    <div className="info-icon-box">
                      <Mail size={18} />
                    </div>
                    <div>
                      <strong>Email Address</strong>
                      <span>nationalsolars5@gmail.com</span>
                    </div>
                  </li>
                  <li>
                    <div className="info-icon-box">
                      <Clock size={18} />
                    </div>
                    <div>
                      <strong>Working Hours</strong>
                      <span>Monday – Saturday: 9:00 AM – 6:00 PM</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* 3. FAQ Accordion Section */}
        <div className="contact-faq-section">
          <div className="faq-section-header">
            <span className="faq-badge">Got Questions?</span>
            <h2 className="faq-section-title">Frequently Asked Questions</h2>
            <p className="faq-section-subtitle">
              Clear answers to common questions about rooftop solar, government subsidies, net metering, and maintenance.
            </p>
          </div>

          <div className="faq-accordion-list" role="region" aria-label="Frequently Asked Questions">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className={`faq-accordion-item ${isOpen ? "is-open" : ""}`}
                >
                  <button
                    type="button"
                    className="faq-accordion-button"
                    onClick={() => toggleFaq(index)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${index}`}
                    id={`faq-question-${index}`}
                  >
                    <span className="faq-question-text">{faq.question}</span>
                    <ChevronDown
                      size={20}
                      className={`faq-chevron-icon ${isOpen ? "rotate" : ""}`}
                    />
                  </button>
                  <div
                    id={`faq-answer-${index}`}
                    role="region"
                    aria-labelledby={`faq-question-${index}`}
                    className={`faq-accordion-collapse ${isOpen ? "show" : ""}`}
                  >
                    <div className="faq-answer-inner">
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
