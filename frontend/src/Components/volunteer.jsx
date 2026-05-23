import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiUser,
  FiMail,
  FiArrowRight,
  FiCheck,
  FiAlertCircle,
  FiLoader,
} from "react-icons/fi";
// FiCheck is used in the sidebar benefit list
import { createVolunteer } from "../api/ApiService";
import Navbar from "./Navbar";
import "../Styles/volunteer.css";

const Req = () => <span style={{ color: "#ef4444", marginLeft: "2px" }} aria-hidden="true"> *</span>;

const Volunteer = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
  });
  const [submitStatus, setSubmitStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus("loading");
    setErrorMsg("");

    try {
      await createVolunteer({
        first_name: formData.firstName,
        last_name: formData.lastName,
        email_address: formData.email,
        gender: formData.gender,
      });
      navigate("/thank-you?type=volunteer");
    } catch (error) {
      setSubmitStatus("error");
      if (error.response?.status === 400) {
        setErrorMsg("This email address is already registered as a volunteer.");
      } else if (error.request) {
        setErrorMsg("Unable to connect to the server. Please check your connection and try again.");
      } else {
        setErrorMsg("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="vol-page">
      <Navbar />

      <header className="vol-hero">
        <div className="vol-hero-inner">
          <span className="vol-badge">Join Our Community</span>
          <h1>Become a Volunteer</h1>
          <p>
            Make a lasting difference. Join YOSA and help build stronger,
            more empowered communities across Ghana through mentorship,
            advocacy, and community-driven action.
          </p>
        </div>
      </header>

      <section className="vol-body">
        <div className="vol-form-wrap">
          <form className="vol-form" onSubmit={handleSubmit} noValidate>
              <h2 className="vol-form-title">Personal Information</h2>

              {submitStatus === "error" && (
                <div className="vol-error-banner" role="alert">
                  <FiAlertCircle size={18} />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div className="vol-row">
                <div className="vol-field">
                  <label htmlFor="firstName">First Name<Req /></label>
                  <div className="vol-input-wrap">
                    <FiUser className="vol-icon" />
                    <input
                      id="firstName"
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="First name"
                      required
                      pattern="[A-Za-z\s\-']{2,}"
                      title="Please enter a valid first name (letters only, min 2 characters)"
                    />
                  </div>
                </div>

                <div className="vol-field">
                  <label htmlFor="lastName">Last Name<Req /></label>
                  <div className="vol-input-wrap">
                    <FiUser className="vol-icon" />
                    <input
                      id="lastName"
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Last name"
                      required
                      pattern="[A-Za-z\s\-']{2,}"
                      title="Please enter a valid last name (letters only, min 2 characters)"
                    />
                  </div>
                </div>
              </div>

              <div className="vol-field">
                <label htmlFor="email">Email Address<Req /></label>
                <div className="vol-input-wrap">
                  <FiMail className="vol-icon" />
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    required
                    title="Please enter a valid email address"
                  />
                </div>
              </div>

              <div className="vol-field">
                <label htmlFor="gender">Gender<Req /></label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                  className="vol-select"
                >
                  <option value="">Select gender</option>
                  <option value="M">Male</option>
                  <option value="F">Female</option>
                  <option value="O">Prefer not to say</option>
                </select>
              </div>

              <button
                type="submit"
                className="vol-btn"
                disabled={submitStatus === "loading"}
              >
                {submitStatus === "loading" ? (
                  <>
                    <FiLoader className="vol-spin" size={18} />
                    Submitting...
                  </>
                ) : (
                  <>
                    Register Now
                    <FiArrowRight size={18} />
                  </>
                )}
              </button>
            </form>
        </div>

        <aside className="vol-sidebar">
          <div className="vol-info-card">
            <h3>Why Volunteer with YOSA?</h3>
            <ul className="vol-benefit-list">
              <li>
                <FiCheck className="vol-check" />
                Build leadership and professional skills
              </li>
              <li>
                <FiCheck className="vol-check" />
                Contribute to sustainable community development
              </li>
              <li>
                <FiCheck className="vol-check" />
                Connect with motivated young change-makers
              </li>
              <li>
                <FiCheck className="vol-check" />
                Make a measurable impact in people's lives
              </li>
              <li>
                <FiCheck className="vol-check" />
                Gain mentorship from experienced community leaders
              </li>
            </ul>
          </div>

          <div className="vol-contact-card">
            <h4>Questions?</h4>
            <p>Reach us at</p>
            <a href="mailto:youthspaceafrika@gmail.com">
              youthspaceafrika@gmail.com
            </a>
          </div>
        </aside>
      </section>
    </div>
  );
};

export default Volunteer;
