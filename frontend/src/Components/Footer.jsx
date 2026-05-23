import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../Styles/Footer.css";
import yosaIcon from "../Assets/yosa.png";
import { subscribeNewsletter } from "../api/ApiService";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subStatus, setSubStatus] = useState("idle");
  const [subMessage, setSubMessage] = useState("");

  const handleSubscribe = async () => {
    const trimmed = email.trim();
    if (!trimmed) return;
    setSubStatus("loading");
    setSubMessage("");
    try {
      const res = await subscribeNewsletter({ email: trimmed });
      if (res.data.success) {
        setSubStatus("success");
        setSubMessage(res.data.message || "Subscribed!");
        setEmail("");
      } else {
        setSubStatus("info");
        setSubMessage(res.data.message || "Already subscribed.");
      }
    } catch {
      setSubStatus("error");
      setSubMessage("Something went wrong. Please try again.");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSubscribe();
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section logo">
          <img src={yosaIcon} alt="Yosa Logo" className="yosa-icon" />
          <p>Youth Space Afrika</p>
          <p>Help make the world Better</p>
        </div>

        <div className="footer-section quick-link">
          <h3>Quick Link</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/outreach">Outreach</Link></li>
            <li><Link to="/donate">Donate</Link></li>
          </ul>
        </div>

        <div className="footer-section get-in-touch">
          <h3>Get In Touch</h3>
          <ul>
            <li><Link to="/contact">Contact Us</Link></li>
            <li><Link to="/volunteer">Volunteer</Link></li>
            <li><Link to="/faq">FAQ</Link></li>
          </ul>
        </div>

        <div className="footer-section address">
          <h3>Address</h3>
          <p>Dansoman, Asore Daaho</p>
          <p>+233 201 012 583</p>
          <p>youthspaceafrika@gmail.com</p>
        </div>

        <div className="footer-section newsletter">
          <h3>Newsletter</h3>
          <label htmlFor="newsletter-email">
            Email address<span className="required">*</span>
          </label>
          <input
            id="newsletter-email"
            type="email"
            placeholder="Enter Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={subStatus === "loading"}
            required
          />
          <button
            type="button"
            onClick={handleSubscribe}
            disabled={subStatus === "loading" || !email.trim()}
          >
            {subStatus === "loading" ? "Subscribing…" : "Subscribe"}
          </button>
          {subMessage && (
            <p className={`sub-feedback sub-feedback--${subStatus}`}>
              {subMessage}
            </p>
          )}
          <p>Your email is safe with us, we don't spam.</p>
          <div className="social-icons">
            <i className="fab fa-twitter"></i>
            <i className="fab fa-instagram"></i>
            <i className="fab fa-pinterest"></i>
            <i className="fab fa-youtube"></i>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; Copyright 2024. Task JBD Innovators</p>
      </div>
    </footer>
  );
};

export default Footer;
