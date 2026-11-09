import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "./HomePage.css";
import homehouse from "../pics/homehouse.png";
import eco from "../pics/eco.png";
import government from "../pics/government.png";
import save_money from "../pics/save_money.png";
import Who_are_we from "../pics/Who_are_we.jpg";

const testimonials = [
  { id: 1, quote: "My roof layout is a bit complicated. The engineering team designed a custom solution that maximized our sun exposure. They clearly explained why they were placing each panel, and the final system is performing even better than they promised.", author: "Dnyaneshwar Marne" },
  { id: 2, quote: "I was worried about the installation work on my roof. But the crew was exceptional—punctual, polite, and incredibly organized. They worked efficiently and left my home spotless. You wouldn't even know they had been here.", author: "Nitin Agarkar" },
  { id: 3, quote: "From start to finish, I had a single point of contact who kept me updated. I always knew what was happening next, from the inspection to the final approval. The entire project was managed perfectly.", author: "Philip Charlie" },
  { id: 4, quote: "The entire process was incredibly smooth. The team handled all the subsidy paperwork and government approvals, which saved me a huge headache.", author: "Dadasaheb Khedkar" },
];

const TestimonialSlider = () => {
  const [current, setCurrent] = useState(0);
  const total = testimonials.length;

  const nextSlide = useCallback(() => {
    setCurrent(prev => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    setCurrent(prev => (prev - 1 + total) % total);
  }, [total]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "ArrowLeft") prevSlide();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [nextSlide, prevSlide]);

  return (
    <div className="testimonial-slider-wrapper">
      <div className="testimonial-slider" style={{ transform: `translateX(-${current * 100}%)` }}>
        {testimonials.map((t) => (
          <div key={t.id} className="testimonial-slide">
            <span className="testimonial-quote-icon">“</span>
            <p className="testimonial-quote">{t.quote}</p>
            <span className="testimonial-author">— {t.author}</span>
          </div>
        ))}
      </div>

      {total > 1 && (
        <>
          <button
            type="button"
            className="slider-nav-btn prev"
            onClick={prevSlide}
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type="button"
            className="slider-nav-btn next"
            onClick={nextSlide}
            aria-label="Next testimonial"
          >
            <ChevronRight size={20} />
          </button>
        </>
      )}

      <div className="slider-dots">
        {testimonials.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === current ? "active" : ""}`}
            onClick={() => setCurrent(index)}
            aria-label={`Go to testimonial ${index + 1}`}
          ></span>
        ))}
      </div>
    </div>
  );
};

const Home = () => {
  const navigate = useNavigate();

  const goToServices = () => {
    navigate("/services");
  };

  const goToCalculator = () => {
    navigate("/calculator");
  };

  const goToAbout = () => {
    navigate("/about");
  };

  return (
    <div className="home-page-wrapper">
      {/* 1. HERO SECTION */}
      <section
        className="hero-section"
        style={{ backgroundImage: `url(${homehouse})` }}
      >
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>National Solar System</h1>
          <p>“Powering the future with Solar”</p>
          <p className="hero-subtagline">Clean • Reliable • Sustainable Energy</p>
          <div className="hero-buttons">
            <button className="btn-explore" onClick={goToServices}>
              Explore Services
            </button>
            <button className="btn-hero-calculator" onClick={goToCalculator}>
              Solar Calculator ⚡
            </button>
          </div>
        </div>
      </section>

      {/* 2. WHO WE ARE */}
      <section className="who-we-are-section">
        <div className="who-we-are-image">
          <img src={Who_are_we} alt="National Solar System Team" />
        </div>
        <div className="who-we-are-content">
          <h2>Who We Are</h2>
          <p>
            We are a leading solar energy company dedicated to providing clean,
            reliable, and sustainable power solutions. Our mission is to
            revolutionize energy consumption and empower communities with
            innovative solar technology.
          </p>
          <p>
            From residential installations to commercial projects, our expert
            team ensures seamless integration and optimal performance,
            delivering energy independence and a greener future.
          </p>
          <button className="btn-learn" onClick={goToAbout}>Learn More</button>
        </div>
      </section>

      {/* 3. WHY SOLAR */}
      <section className="why-solar-section">
        <div className="container">
          <h2>Why Choose Solar Energy?</h2>
          <p className="why-solar-subtitle">
            Cut down overheads and secure a dependable, eco-friendly energy supply for decades.
          </p>
          <div className="why-solar-grid">
            <div className="feature-item">
              <div className="feature-icon-wrapper">
                <img src={save_money} alt="Save Money" className="feature-icon" />
              </div>
              <h3>Save Money</h3>
              <p>Significantly cut down electricity bills and lock in predictable power costs.</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon-wrapper">
                <img src={eco} alt="Eco-Friendly" className="feature-icon" />
              </div>
              <h3>Eco-Friendly</h3>
              <p>Generate clean, renewable power and actively reduce your carbon emissions.</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon-wrapper">
                <img src={government} alt="Government Benefits" className="feature-icon" />
              </div>
              <h3>Government Benefits</h3>
              <p>Claim substantial Central Government subsidies and net-metering incentives.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. TESTIMONIALS */}
      <section className="testimonials-section container">
        <h2>What Our Customers Say</h2>
        <p className="testimonials-subtitle">
          Real feedback from clients who transitioned to solar with National Solar System.
        </p>
        <TestimonialSlider />
      </section>
    </div>
  );
};

export default Home;
