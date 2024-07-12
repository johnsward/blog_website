import React, { useEffect } from "react";
import "../css/about.css";

const About = () => {
  return (
    <div className="about-container">
    <video autoPlay loop muted className="background-video">
        <source src="/12315333-uhd_3840_2160_30fps.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="image-container">
        <img src="IMG_8447.jpeg" />
        <div className="overlapping-image">
        <img src="IMG_8451.jpeg" />
      </div>
      </div>
      
      <div className="about-content">
        <h1>
            Jag ville ha en plats att lägga upp mina bilder...
        </h1>
        <p>…. Så istället för att betala varje månad för att ha blogg så skapade John den här sidan till mig istället. Hoppas ni gillar det! </p>
      </div>
    </div>
  );
};

export default About;
