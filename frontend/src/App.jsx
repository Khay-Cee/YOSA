import React, { useEffect, useState } from "react";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
} from "react-router-dom";
import Donate from "./Components/Donate";
import Footer from "./Components/Footer";
import LoaderComponent from "./Components/Loader";
import AboutUs from "./Pages/AboutUs";
import ContactUs from "./Pages/ContactUs";
import FAQ from "./Pages/FAQ";
import HomeScreen from "./Pages/HomeScreen";
import Outreach from "./Pages/Outreach";
import ThankYou from "./Pages/ThankYou";
import Volunteer from "./Components/volunteer";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const GoToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      style={{
        position: "fixed",
        bottom: "32px",
        right: "32px",
        zIndex: 9999,
        width: "48px",
        height: "48px",
        borderRadius: "50%",
        background: "#6d39d8",
        color: "#fff",
        border: "none",
        fontSize: "22px",
        cursor: "pointer",
        boxShadow: "0 6px 20px rgba(109,57,216,0.35)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "background 0.2s ease",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = "#35115f")}
      onMouseLeave={(e) => (e.currentTarget.style.background = "#6d39d8")}
      aria-label="Go to top"
    >
      &#8593;
    </button>
  );
};

const App = () => {
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    handleStart();
    setTimeout(handleComplete, 500);

    return () => handleComplete();
  }, [location]);

  return (
    <div>
      <ScrollToTop />
      {loading && <LoaderComponent />}
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/outreach" element={<Outreach />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/volunteer" element={<Volunteer />} />
        <Route path="/thank-you" element={<ThankYou />} />
      </Routes>
      <Footer />
      <GoToTop />
    </div>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
