import React from "react";
import { useSearchParams, Link } from "react-router-dom";
import { FiCheck, FiHome, FiHeart, FiUsers, FiMail } from "react-icons/fi";
import Navbar from "../Components/Navbar";

const CONFIG = {
  donation: {
    icon: FiHeart,
    heading: "Thank You for Your Generosity!",
    sub: (p) =>
      p.get("causeName")
        ? `Your ${p.get("donationType") === "Money" ? "financial gift" : (p.get("donationType") || "donation").toLowerCase() + " donation"} to "${p.get("causeName")}" has been received. YOSA deeply appreciates your support.`
        : p.get("donationType") === "Money"
        ? "Your payment has been received and verified. YOSA deeply appreciates your financial support."
        : `Your ${(p.get("donationType") || "donation").toLowerCase()} donation has been registered. Our team will be in touch to arrange collection.`,
    cta: { to: "/donate", label: "Make Another Donation" },
  },
  volunteer: {
    icon: FiUsers,
    heading: "Registration Successful!",
    sub: () =>
      "Thank you for signing up to volunteer with YOSA. Our team will review your application and reach out soon with the next steps.",
    cta: { to: "/volunteer", label: "Register Another Person" },
  },
  contact: {
    icon: FiMail,
    heading: "Message Sent!",
    sub: () =>
      "Thank you for reaching out to YOSA. We have received your message and will get back to you as soon as possible.",
    cta: { to: "/contact", label: "Send Another Message" },
  },
};

const ThankYou = () => {
  const [params] = useSearchParams();
  const type = params.get("type") || "donation";
  const conf = CONFIG[type] || CONFIG.donation;
  const Icon = conf.icon;

  return (
    <div style={{ minHeight: "100vh", background: "#f7f6fb" }}>
      <Navbar />

      <div
        style={{
          minHeight: "calc(100vh - 60px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px 24px 60px",
          textAlign: "center",
        }}
      >
        {/* Success ring */}
        <div
          style={{
            width: 96,
            height: 96,
            borderRadius: "50%",
            background: "#f0fdf4",
            border: "2px solid #bbf7d0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 28,
            color: "#16a34a",
          }}
        >
          <FiCheck size={44} strokeWidth={2.5} />
        </div>

        {/* Category icon pill */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "6px 16px",
            borderRadius: 999,
            background: "rgba(109,57,216,0.1)",
            color: "#6d39d8",
            fontWeight: 700,
            fontSize: "0.82rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: 20,
          }}
        >
          <Icon size={15} />
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </div>

        <h1
          style={{
            fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
            fontWeight: 800,
            color: "#1b1f36",
            margin: "0 0 16px",
          }}
        >
          {conf.heading}
        </h1>

        <p
          style={{
            fontSize: "1.05rem",
            color: "#6b7280",
            lineHeight: 1.75,
            maxWidth: 520,
            margin: "0 auto 40px",
          }}
        >
          {conf.sub(params)}
        </p>

        {/* Action buttons */}
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center" }}>
          <Link
            to="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "13px 28px",
              borderRadius: 10,
              background: "#1b1f36",
              color: "#fff",
              textDecoration: "none",
              fontWeight: 700,
              fontSize: "0.95rem",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#35115f")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#1b1f36")}
          >
            <FiHome size={16} />
            Back to Home
          </Link>

          <Link
            to={conf.cta.to}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "13px 28px",
              borderRadius: 10,
              background: "#6d39d8",
              color: "#fff",
              textDecoration: "none",
              fontWeight: 700,
              fontSize: "0.95rem",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#35115f")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#6d39d8")}
          >
            {conf.cta.label}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;
