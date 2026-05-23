import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import image3 from '../Assets/education.jpeg';
import image2 from '../Assets/food.jpeg';
import image1 from '../Assets/medical.jpeg';
import image4 from '../Assets/wework.jpeg';
import '../Styles/CauseSection.css';
import { fetchCauses } from '../api/ApiService';

const CATEGORY_IMAGE = {
  Medical:   image1,
  Homeless:  image4,
  Education: image3,
  Food:      image2,
};

const DonationCard = ({ cause, onDonate }) => {
  const raised = Number(cause.raised);
  const goal   = Number(cause.goal);
  const pct    = goal > 0 ? Math.min(100, Math.round((raised / goal) * 100)) : 0;
  const image  = CATEGORY_IMAGE[cause.category] || image1;

  const fmt = (n) =>
    n >= 1000
      ? `$${(n / 1000).toFixed(1)}k`
      : `$${Math.round(n).toLocaleString()}`;

  return (
    <div className="donation-card">
      <img src={image} alt={cause.name} className="donation-card-image" />
      <div className="donation-card-content">
        <h3 className="donation-card-category">{cause.category}</h3>
        <h2 className="donation-card-title">{cause.name}</h2>
        <p className="donation-card-description">{cause.description}</p>

        <div className="donation-card-progress-bar">
          <div style={{ width: `${pct}%` }} className="donation-card-progress" />
        </div>

        <div className="donation-card-stats">
          <span>Raised: {fmt(raised)}</span>
          <span>{pct}%</span>
          <span>Goal: {fmt(goal)}</span>
        </div>
      </div>

      <button
        className="donation-card-button"
        onClick={() => onDonate(cause)}
      >
        Donate Now
      </button>
    </div>
  );
};

const CauseSection = () => {
  const [causes, setCauses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCauses()
      .then((res) => setCauses(res.data))
      .catch(() => setCauses([]))
      .finally(() => setLoading(false));
  }, []);

  const handleDonate = (cause) => {
    navigate(`/donate?causeId=${cause.id}&causeName=${encodeURIComponent(cause.name)}&category=${encodeURIComponent(cause.category)}`);
  };

  return (
    <div className="donation-cards-section">
      <h2 className="heading">Latest Causes</h2>
      <h1 className="section-heading">Find The Popular Cause And Donate Them</h1>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '40px', color: '#6d39d8', fontSize: '1.1rem' }}>
          Loading causes…
        </div>
      ) : causes.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px', color: '#888' }}>
          No causes available right now.
        </div>
      ) : (
        <div className="donation-cards-grid">
          {causes.map((cause) => (
            <DonationCard key={cause.id} cause={cause} onDonate={handleDonate} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CauseSection;
