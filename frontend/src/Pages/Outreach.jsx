import React from "react";
import Navbar from "../Components/Navbar";
import Testimonial from "../Components/Testimonial";
import "../Styles/AboutUs.css";
import "../Styles/Outreach.css";
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

const outreachImages = [
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

const Outreach = () => {
  return (
    <div className="outreach-page">
      <header className="outreach-hero">
        <Navbar />
        <div className="outreach-hero__content">
          <span className="outreach-hero__tag">Outreach</span>
          <h1>Amanfrom Community Education</h1>
          <p>
            On 26 December 2025, YOSA joined the people of Amanfrom to educate
            youths, drivers, women, and children on Sexual and Gender Based
            Violence, the signs to look out for, how to respond safely, and
            where to report abuse. The day ended in warmth, conversation, food,
            and drinks shared with the community.
          </p>
        </div>
      </header>

      <main className="outreach-main">
        <section className="gallery-section">
          <div className="gallery-section__header">
            <span className="gallery-kicker">Amanfrom</span>
            <h2>Photos from the day</h2>
            <p>
              A visual story of learning, conversation, and community support.
            </p>
          </div>

          <div className="gallery-story">
            <article className="gallery-story__card">
              <span className="gallery-story__tag">Community Education</span>
              <h3>Talking openly about safety and support.</h3>
              <p>
                The outreach created a safe space for honest dialogue about
                consent, warning signs, trusted reporting channels, and how the
                entire community can help protect vulnerable people.
              </p>
            </article>

            <div className="gallery-story__facts">
              <div>
                <strong>Audience</strong>
                <span>Youths, drivers, women, and children</span>
              </div>
              <div>
                <strong>Focus</strong>
                <span>SGBV awareness, signs, response, and reporting</span>
              </div>
              <div>
                <strong>Atmosphere</strong>
                <span>
                  Friendly, welcoming, and shared over food and drinks
                </span>
              </div>
            </div>
          </div>

          <div className="gallery-grid">
            {outreachImages.map((image, index) => (
              <figure
                className={`gallery-card ${index === 0 ? "gallery-card--featured" : ""}`}
                key={`${image}-${index}`}>
                <img
                  src={image}
                  alt={`Amanfrom outreach moment ${index + 1}`}
                />
                <figcaption>
                  <span>Photo {String(index + 1).padStart(2, "0")}</span>
                  <p>26 Dec 2025 • Amanfrom community outreach</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      </main>

      <Testimonial />
    </div>
  );
};

export default Outreach;
