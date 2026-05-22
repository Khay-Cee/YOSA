import React from "react";
import { Link } from "react-router-dom";
import donationEvent from "../Assets/about1.jpeg";
import communityGathering from "../Assets/aboutt.jpeg";
import imagee1 from "../Assets/imagee1.jpg";
import imagee2 from "../Assets/imagee2.jpg";
import imagee3 from "../Assets/imagee3.jpg";
import imagee4 from "../Assets/imagee4.jpg";
import imagee5 from "../Assets/imagee5.jpg";
import imagee6 from "../Assets/imagee6.jpg";
import imagee7 from "../Assets/imagee7.jpg";
import imagee8 from "../Assets/imagee8.jpg";
import imagee9 from "../Assets/imagee9.jpg";
import imagee10 from "../Assets/imagee10.jpg";
import imagee11 from "../Assets/imagee11.jpg";
import imagee12 from "../Assets/imagee12.jpg";
import CauseSection from "../Components/CauseSection";
import CharitySection from "../Components/CharitySection";
import FunFacts from "../Components/FunFacts";
import Navbar from "../Components/Navbar";
import "../Styles/HomeScreen.css";
import LatestNews from "../Components/News";

const galleryImages = [
  imagee1,
  imagee2,
  imagee3,
  imagee4,
  imagee5,
  imagee6,
  imagee7,
  imagee8,
  imagee9,
  imagee10,
  imagee11,
  imagee12,
];

const values = ["Impact", "Love", "Care", "Philanthropy", "Hope"];

const HomeScreen = () => {
  return (
    <div className="HomeScreen">
      <Navbar />
      <section className="hero">
        <div className="hero-grid">
          <div className="hero-panel hero-panel--intro">
            <span className="glass-tag">
              Youth-led. Community-rooted. Future-focused.
            </span>
            <h1>Helping Each Other Can Make The World Better</h1>
            <p>
              YOSA is a youth-led movement building confident young people,
              stronger families, and healthier communities through leadership,
              advocacy, mentorship, and practical support.
            </p>
            <div className="hero-buttons">
              <Link
                to="/donate"
                className="hero-button hero-button--dark">
                Donate Now
              </Link>
              <Link
                to="/volunteer"
                className="hero-button hero-button--ghost">
                Volunteer With Us
              </Link>
            </div>
          </div>

          <div className="hero-panel hero-panel--carousel">
            <div className="carousel-frame">
              <div className="gallery-marquee">
                <div className="gallery-track">
                  {[...galleryImages, ...galleryImages].map((image, index) => (
                    <div
                      className="gallery-slide"
                      key={`${index}-${image}`}>
                      <img
                        src={image}
                        alt={`YOSA gallery ${index + 1}`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="hero-panel hero-panel--values">
            <div className="values-rail">
              <div className="values-track">
                {[...values, ...values].map((value, index) => (
                  <div
                    className="value-pill"
                    key={`${value}-${index}`}>
                    {value}
                  </div>
                ))}
              </div>
            </div>
            <div className="values-label">Core Values</div>
          </div>
        </div>
      </section>

      <div className="support-section">
        <div className="images">
          <img
            src={communityGathering}
            alt="Community gathering under trees"
            className="image image1"
          />
          <img
            src={donationEvent}
            alt="People receiving awards"
            className="image image2"
          />
        </div>
        <div className="content">
          <h2>About Us</h2>
          <h1>Your Support Is Really Powerful.</h1>
          <p>
            Working Towards A World Where Young People, Irrespective Of Gender,
            Unlock Their Full Potential Through Youth Leadership, Mentorship,
            And Empowerment, Contributing To A Brighter Future For All.
          </p>
          <Link to="/about">
            <button className="read-more">Read More</button>
          </Link>
        </div>
      </div>

      <CharitySection />
      <FunFacts />
      <CauseSection />
      <LatestNews />
    </div>
  );
};

export default HomeScreen;
