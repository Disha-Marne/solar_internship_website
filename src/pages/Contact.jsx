import React, { useState } from "react";
import "./Contact.css";
import businessMeetingImg from "../pics/contact.png";
const API_URL = import.meta.env.VITE_API_URL;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    consumerNumber: "",
    query: ""
  });

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
    <section className="contact-section">
      <div className="contact-container">
        <div className="contact-header">
          <h1 className="contact-main-title">Get in Touch with us</h1>
          <p className="contact-subtitle">We're here to help you with solar solutions.</p>
        </div>

        <div className="contact-content-grid">
          <div className="contact-left-column">
            <div className="enquiry-form-wrapper">
              <h2 className="enquiry-title">Enquire Now</h2>
              <form className="enquiry-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <input type="text" name="name" placeholder="Name" className="form-input" value={formData.name} onChange={handleChange} required />
                  <input type="email" name="email" placeholder="E-mail" className="form-input" value={formData.email} onChange={handleChange} required />
                </div>

                <div className="form-row">
                  <input type="tel" name="phone" placeholder="Phone no." className="form-input" value={formData.phone} onChange={handleChange} maxLength="10" required />
                  <input type="text" name="consumerNumber" placeholder="Consumer No." className="form-input" value={formData.consumerNumber} onChange={handleChange} maxLength="15" required />
                </div>

                <div className="form-row">
                  <textarea name="query" placeholder="Query" className="form-input query-box" value={formData.query} onChange={handleChange} required />
                </div>

                <div className="form-row">
                  <button type="submit" className="btn-submit">Submit</button>
                </div>
              </form>
            </div>
          </div>

          <div className="contact-right-column">
            <div className="contact-image-wrapper">
              <img src={businessMeetingImg} alt="Contact" className="contact-image" />
            </div>
            <div className="contact-info-box">
              <h3>Contact Info</h3>
              <ul>
                <li>📍 Nigdi, Pune</li>
                <li>📞 +91 91194 77479</li>
                <li>✉️ nationalsolars5@gmail.com</li>
                <li>🕒 Mon–Sat 9AM–6PM</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;