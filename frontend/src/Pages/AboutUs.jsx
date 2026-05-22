import image1 from "../Assets/Gall1.png";
import image2 from "../Assets/gall2.png";
import image3 from "../Assets/gall3.png";
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "../Styles/AboutUs.css";
import Navbar from "../Components/Navbar";
import hope from "../Assets/hope.png";
import Team from "../Components/Team";
import Testimonial from "../Components/Testimonial";
import "../Styles/AboutUs.css";

const features = [
  {
    title: "Food & Homeless Charity",
    description:
      "Providing hope and support to those in need, one meal and one home at a time. Your generosity will help us feed the hungry and shelter the homeless, bringing comfort and dignity to those who need it most.",
    points: [
      "Help us serve a meal, change a life",
      "Every donation brings us closer to a hunger-free community",
      "Together, we can provide a home for all",
    ],
    icon: require("../Assets/houseicon.png"),
  },
  {
    title: "Make A Donation",
    description:
      "Together, we can make a difference in the lives of those in need. Your donation will help support our mission to create a better world for all. Every contribution counts, no matter how big or small.",
    points: [
      "Be the change you wish to see in the world",
      "Every donation brings us closer to a brighter future",
      "Your generosity can change lives",
    ],
    icon: require("../Assets/dolldo.png"),
  },
  {
    title: "Non Profit NGO",
    description:
      "Empowering communities, enriching lives. Our non-profit organization is dedicated to creating positive change. Your support enables us to make a meaningful difference in the lives of those who need it most.",
    points: [
      "Together, we can create a brighter future",
      "Every contribution counts in our mission to serve",
    ],
    icon: require("../Assets/shakeicon.png"),
  },
];

const AboutUs = () => {
  const featuresRailRef = useRef(null);

  useEffect(() => {
    const rail = featuresRailRef.current;

    if (!rail) {
      return undefined;
    }

    let animationFrameId;

    const step = () => {
      const maxScroll = rail.scrollWidth - rail.clientWidth;

      if (maxScroll > 0) {
        rail.scrollLeft += 0.3;

        if (rail.scrollLeft >= maxScroll - 1) {
          rail.scrollLeft = 0;
        }
      }

      animationFrameId = window.requestAnimationFrame(step);
    };

    animationFrameId = window.requestAnimationFrame(step);

    return () => window.cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div className="about-page">
      <header className="header">
        <Navbar />
        <div className="header-text">
          <h1>About Us</h1>
        </div>
      </header>

      <div className="container">
        <div className="image-content">
          <img
            src={image1}
            alt="Team Img 1"
          />
          <img
            src={image2}
            alt="Team Img 2"
          />
          <img
            src={image3}
            alt="Team Img 3"
          />
        </div>
        <div className="text-content">
          <h1>About Us</h1>
          <p>
            Youth Space Afrika is a non for profit, youth led, adolescent focus
            and women focused organization that provides safe spaces for young
            people and girls to develop their potentials and as well advocate
            for against issues that affect adolescents, marginalized and
            vulnerable such as Persons with Disabilities, Persons living with
            HIV and Street children. The organization further serves as a
            platform where young people are able to access all information
            relating to their Sexual and Reproductive Health and Rights in order
            for them to make informed decisions.
          </p>
        </div>
      </div>
      <Team />
      <div className="about-us-section">
        <div className="image-container">
          <img
            src={hope}
            alt="Painted rocks with hope message"
            className="main-image"
          />
          <div className="overlay">
            <ul className="overlay-text">
              Together, We're Going to Make The Future<br></br>
              Children Where We Are Able To Fulfill All Their Requirements
              <br></br> To Keep Them Safe From Withered World<b></b>
              We <br></br>Have Already Stepped Out And Start Changing <br></br>
              The World Keeping Safe Them From War, Inhumanity
            </ul>
          </div>
        </div>
      </div>

      <div className="about-outreach-link">
        <Link
          to="/outreach"
          className="about-outreach-link__button">
          View the Outreach Page
        </Link>
      </div>

      <section className="features-section">
        <h2>Our Features</h2>
        <div
          className="features-cards"
          ref={featuresRailRef}>
          {features.map((feature, index) => (
            <div
              key={index}
              className={`feature-card ${
                index === 0 ? "feature-card-light" : "feature-card-light"
              }`}>
              <div className="icon-wrapper">
                <img
                  src={feature.icon}
                  alt={feature.title}
                  className="icon"
                />
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
              <ul>
                {feature.points.map((point, idx) => (
                  <li key={idx}>{point}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <Testimonial />
    </div>
  );
};

export default AboutUs;
