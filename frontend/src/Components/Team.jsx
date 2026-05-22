import React from "react";
import "../Styles/Team.css";
import ChelseaImage from "../Assets/Chelsea.jpeg";
import Albertina from "../Assets/Albertina .jpeg";
import Edward from "../Assets/Edward.jpg";
import Divine from "../Assets/Divine .jpeg";
import Advisor1 from "../Assets/Mavis.jpg";
import Advisor2 from "../Assets/Robert.jpeg";
import Advisor3 from "../Assets/Britney.jpeg";
import Advisor4 from "../Assets/Petra .jpeg";
import Advisor5 from "../Assets/Wisdom_Headshot.jpg";

const teamMembers = [
  {
    name: "Chelsea Armah",
    title: "Chief Executive Director",
    image: ChelseaImage,
  },
  {
    name: "Albertina Alipui",
    title: "Finance and Administrative Manager",
    image: Albertina,
  },
  {
    name: "Edward Mensah",
    title: "Programmes Coordinator",
    image: Edward,
  },
  {
    name: "Divine Ovie Sosu",
    title: "IT Specialist/Social Media Coordinator",
    image: Divine,
  },
  {
    name: "Mavis Naa Korley Aryee",
    title: "Board Chair",
    image: Advisor1,
  },
  {
    name: "Robert Amoh",
    title: "1st Vice Chair",
    image: Advisor2,
  },
  {
    name: "Britney Helena Armah-Aidoo",
    title: "Board Secretary",
    image: Advisor3,
  },
  {
    name: "Petra Oluchi Akabuogu",
    title: "Board Member",
    image: Advisor4,
  },
  {
    name: "Wisdom",
    title: "Board Member",
    image: Advisor5,
  },
];

const marqueeMembers = [...teamMembers, ...teamMembers, ...teamMembers];

const Team = () => {
  return (
    <div className="team-container">
      <div className="team-heading-block">
        <h1 className="headingg">Meet Our Team</h1>
        <p className="team-subheading">
          Youth Space Afrika management and board members working together to
          serve.
        </p>
      </div>

      <div className="team-marquee">
        <div className="team-members team-members--track">
          {marqueeMembers.map((member, index) => (
            <div
              className="team-member team-member--card"
              key={`${member.name}-${index}`}>
              <div className="team-portrait-wrap">
                <img
                  src={member.image}
                  alt={member.name}
                />
              </div>
              <div className="team-caption">
                <h3 className="temp">{member.name}</h3>
                <p className="teamp">{member.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Team;
