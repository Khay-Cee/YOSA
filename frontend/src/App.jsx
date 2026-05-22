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
import Volunteer from "./Components/volunteer";

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
      {loading && <LoaderComponent />}
      <Routes>
        <Route
          path="/"
          element={<HomeScreen />}
        />
        <Route
          path="/about"
          element={<AboutUs />}
        />
        <Route
          path="/outreach"
          element={<Outreach />}
        />
        <Route
          path="/contact"
          element={<ContactUs />}
        />
        <Route
          path="/faq"
          element={<FAQ />}
        />
        <Route
          path="/donate"
          element={<Donate />}
        />
        <Route
          path="/volunteer"
          element={<Volunteer />}
        />
      </Routes>
      <Footer />
    </div>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
