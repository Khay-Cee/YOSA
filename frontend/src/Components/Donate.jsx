import React, { useState, useEffect, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { usePaystackPayment } from "react-paystack";
import {
  FiUser,
  FiMail,
  FiCreditCard,
  FiPackage,
  FiTag,
  FiArrowRight,
  FiAlertCircle,
  FiLoader,
  FiDollarSign,
  FiTarget,
} from "react-icons/fi";
import axios from "axios";
import { createDonation } from "../api/ApiService";
import Navbar from "./Navbar";
import "../Styles/Donate.css";

const PAYSTACK_KEY = "pk_test_fef259dc53273c2348a226b62931b00eb6f4cb7c";

const DONATION_TYPES = [
  { value: "Money",    label: "Financial Donation", icon: FiCreditCard, description: "Support us with a monetary gift" },
  { value: "Food",     label: "Food Donation",      icon: FiPackage,    description: "Donate food supplies to the community" },
  { value: "Clothing", label: "Clothing Donation",  icon: FiTag,        description: "Donate clothing items for distribution" },
];

// Red asterisk shown next to required field labels
const Req = () => <span className="don-req" aria-hidden="true"> *</span>;

const DonateInner = () => {
  const [searchParams] = useSearchParams();
  const navigate      = useNavigate();
  const causeId       = searchParams.get("causeId")   || null;
  const causeName     = searchParams.get("causeName") || null;
  const causeCategory = searchParams.get("category")  || null;

  const [formData, setFormData] = useState({
    firstName:    "",
    lastName:     "",
    email:        "",
    donationType: causeId ? "Money" : "",
    amount:       "",
    currency:     "GHS",
  });
  const [submitStatus, setSubmitStatus] = useState("idle");
  const [errorMsg,     setErrorMsg]     = useState("");
  const [paymentRef,   setPaymentRef]   = useState(null);
  const openPaystack = useRef(false);

  // Paystack config — reference is filled in once backend returns it
  const paystackConfig = {
    reference: paymentRef || "",
    email:     formData.email,
    amount:    Number(formData.amount) * 100,
    publicKey: PAYSTACK_KEY,
    currency:  formData.currency,
  };

  const initializePayment = usePaystackPayment(paystackConfig);

  // react-paystack v5: callbacks go inside an object { onSuccess, onClose }
  useEffect(() => {
    if (paymentRef && openPaystack.current) {
      openPaystack.current = false;
      initializePayment({
        onSuccess: (ref) => {
          // fire-and-forget verify; navigate either way
          axios
            .get(`http://localhost:8000/verify-payment/?reference=${ref.reference}`)
            .catch(() => {});
          const base = `/thank-you?type=donation&donationType=Money`;
          window.location.href = causeName
            ? `${base}&causeName=${encodeURIComponent(causeName)}`
            : base;
        },
        onClose: () => {
          setPaymentRef(null);
          setSubmitStatus("idle");
        },
      });
    }
  }, [paymentRef]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTypeSelect = (type) => {
    setFormData((prev) => ({ ...prev, donationType: type, amount: "", currency: "GHS" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus("loading");
    setErrorMsg("");

    if (formData.donationType === "Money") {
      try {
        const res = await createDonation({
          first_name:    formData.firstName,
          last_name:     formData.lastName,
          email_address: formData.email,
          donation_type: "Money",
          amount:        formData.amount,
          ...(causeId ? { cause: causeId } : {}),
        });
        // Setting paymentRef triggers the useEffect which opens Paystack
        openPaystack.current = true;
        setPaymentRef(res.data.reference);
        setSubmitStatus("idle");
      } catch {
        setSubmitStatus("error");
        setErrorMsg("Failed to initialise payment. Please check your details and try again.");
      }
      return;
    }

    // Non-monetary: Food / Clothing
    try {
      await createDonation({
        first_name:    formData.firstName,
        last_name:     formData.lastName,
        email_address: formData.email,
        donation_type: formData.donationType,
        amount:        0,
        ...(causeId ? { cause: causeId } : {}),
      });
      const qs = `type=donation&donationType=${encodeURIComponent(formData.donationType)}${causeName ? `&causeName=${encodeURIComponent(causeName)}` : ""}`;
      navigate(`/thank-you?${qs}`);
    } catch (error) {
      setSubmitStatus("error");
      setErrorMsg(
        error.request
          ? "Unable to connect to the server. Please try again later."
          : "An error occurred while submitting your donation. Please try again."
      );
    }
  };

  return (
    <div className="don-page">
      <Navbar />

      <header className="don-hero">
        <div className="don-hero-inner">
          <span className="don-badge">Support Our Mission</span>
          <h1>Your Donation Changes Lives</h1>
          <p>
            Every contribution — whether money, food, or clothing — directly
            supports young people and families across Ghana.
          </p>
        </div>
      </header>

      <section className="don-body">
        <form className="don-form-wrap" onSubmit={handleSubmit}>

          {/* Cause banner when arriving from the cause section */}
          {causeId && causeName && (
            <div className="don-cause-banner">
              <FiTarget size={20} className="don-cause-icon" />
              <div>
                <strong>Donating to:</strong> {causeName}
                {causeCategory && <span className="don-cause-cat"> · {causeCategory}</span>}
              </div>
            </div>
          )}

          {/* ── Personal info ── */}
          <div className="don-section">
            <h2 className="don-section-title">Your Information</h2>
            <div className="don-row">
              <div className="don-field">
                <label htmlFor="firstName">First Name<Req /></label>
                <div className="don-input-wrap">
                  <FiUser className="don-icon" />
                  <input
                    id="firstName" type="text" name="firstName"
                    value={formData.firstName} onChange={handleChange}
                    placeholder="First name"
                    required
                    pattern="[A-Za-z\s\-']{2,}"
                    title="Please enter a valid first name (letters only, min 2 characters)"
                  />
                </div>
              </div>
              <div className="don-field">
                <label htmlFor="lastName">Last Name<Req /></label>
                <div className="don-input-wrap">
                  <FiUser className="don-icon" />
                  <input
                    id="lastName" type="text" name="lastName"
                    value={formData.lastName} onChange={handleChange}
                    placeholder="Last name"
                    required
                    pattern="[A-Za-z\s\-']{2,}"
                    title="Please enter a valid last name (letters only, min 2 characters)"
                  />
                </div>
              </div>
            </div>

            <div className="don-field">
              <label htmlFor="email">Email Address<Req /></label>
              <div className="don-input-wrap">
                <FiMail className="don-icon" />
                <input
                  id="email" type="email" name="email"
                  value={formData.email} onChange={handleChange}
                  placeholder="you@example.com"
                  required
                  title="Please enter a valid email address"
                />
              </div>
            </div>
          </div>

          {/* ── Donation type ── */}
          <div className="don-section">
            <h2 className="don-section-title">
              Donation Type<Req />
            </h2>
            <div className="don-type-grid">
              {DONATION_TYPES.map(({ value, label, icon: Icon, description }) => (
                <button
                  type="button" key={value}
                  className={`don-type-card${formData.donationType === value ? " don-type-card--active" : ""}`}
                  onClick={() => handleTypeSelect(value)}
                >
                  <Icon size={26} className="don-type-icon" />
                  <span className="don-type-label">{label}</span>
                  <span className="don-type-desc">{description}</span>
                </button>
              ))}
            </div>
          </div>

          {/* ── Amount (money only) ── */}
          {formData.donationType === "Money" && (
            <div className="don-section">
              <h2 className="don-section-title">Donation Amount</h2>
              <div className="don-amount-wrap">
                <div className="don-field don-currency-field">
                  <label htmlFor="currency">Currency</label>
                  <select
                    id="currency" name="currency"
                    value={formData.currency} onChange={handleChange}
                    className="don-select"
                  >
                    <option value="GHS">GHS — Ghanaian Cedi</option>
                    <option value="USD">USD — US Dollar</option>
                  </select>
                </div>
                <div className="don-field don-amount-field">
                  <label htmlFor="amount">Amount<Req /></label>
                  <div className="don-input-wrap">
                    <FiDollarSign className="don-icon" />
                    <input
                      id="amount" type="number" name="amount"
                      value={formData.amount} onChange={handleChange}
                      placeholder="0.00" min="1" step="0.01"
                      required
                      title="Please enter an amount of at least 1"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {submitStatus === "error" && (
            <div className="don-error-banner" role="alert">
              <FiAlertCircle size={18} />
              <span>{errorMsg}</span>
            </div>
          )}

          <p className="don-req-note"><span className="don-req">*</span> Required fields</p>

          <button
            type="submit"
            className="don-btn"
            disabled={
              submitStatus === "loading" ||
              !formData.donationType ||
              (formData.donationType === "Money" && !formData.amount)
            }
          >
            {submitStatus === "loading" ? (
              <><FiLoader className="don-spin" size={18} /> Processing…</>
            ) : formData.donationType === "Money" ? (
              <>Pay with Mobile Money or Card <FiCreditCard size={18} /></>
            ) : (
              <>Submit Donation <FiArrowRight size={18} /></>
            )}
          </button>
        </form>

        <aside className="don-sidebar">
          <div className="don-impact-card">
            <h3>Your Impact</h3>
            <div className="don-impact-list">
              <div className="don-impact-item">
                <FiCreditCard className="don-impact-icon" />
                <div>
                  <strong>Financial gifts</strong>
                  <p>Fund mentorship programs, community events, and operational activities.</p>
                </div>
              </div>
              <div className="don-impact-item">
                <FiPackage className="don-impact-icon" />
                <div>
                  <strong>Food donations</strong>
                  <p>Provide nutritious meals to families and children in underserved communities.</p>
                </div>
              </div>
              <div className="don-impact-item">
                <FiTag className="don-impact-icon" />
                <div>
                  <strong>Clothing donations</strong>
                  <p>Supply clothing to individuals and families who need them most.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="don-secure-badge">
            <FiCreditCard size={20} />
            <div>
              <strong>Secure Payments</strong>
              <p>All transactions are processed securely by Paystack.</p>
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
};

export default DonateInner;
