import React  from 'react';
import './index.css'

const About = () => {
  return (
    <div className="about-container">
      <h1>About This App</h1>
      <p>
        This application provides a searchable list of cities from around the world,
        along with live weather for each city. It leverages data from the OpenDataSoft
        API for city information and the OpenWeather API for weather forecasts.
      </p>
      <p>
        Features of this app include:
      </p>
      <ul>
        <li>Searchable city list with infinite scrolling</li>
        <li>Real-time weather forecasts</li>
        <li>City details with additional information</li>
      </ul>
      <p>
        This project is built using React and makes use of third-party APIs for data retrieval. 
        Explore the app to discover more!
      </p>
    </div>
  );
};

export default About;
