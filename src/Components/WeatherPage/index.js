import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaGaugeSimpleHigh } from "react-icons/fa6";
import { FaWind } from "react-icons/fa";

import './index.css'

const WeatherPage = () => {
  const {city} = useParams();
  const [weatherData, setWeatherData] = useState(null);
  const cloudUrl='https://play-lh.googleusercontent.com/WHVv_pVDetZqwAsjUAdRfEXe1RFXJ__39sHlIHDsRpNPwAL_9FXVrrnOfV3_cSccJes=w240-h480-rw'

  console.log(city)

  const fetchWeather = async (city) => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=adc1029f6e14b379c6ded48f668bdd1a`
    );
    const data = await response.json();
    setWeatherData(data);
  };

  useEffect(() => {
    fetchWeather(city);
  }, [city]);
  if (!weatherData) {
    return <div>Loading weather data...</div>;
  }
 
  return (
    <div className='weather-container'>
      <div className='weather-card'>
        <div className='timebar'>
          <h1 className='weather-title'>Current Weather</h1>
          <div>
          <p className='time'> {new Date().toLocaleString()}</p>
          <p className='city'>{weatherData.name}</p>
          </div>
        </div>
        <hr />
        <div className='weather-desc'>
          <div className='temperature'>
            <img src={cloudUrl} className='cloud-img' alt='cloud' />
            <div className='temp-heading'>
              <h1>{(weatherData.main.temp - 273.15).toFixed(2)}°</h1>
              <span className='Celsius'>C</span>
            </div>
          </div>
          <div >
            <h2 className='main'>Weather: {weatherData.weather[0].main}</h2>
            <h1 className='description'>{weatherData.weather[0].description}</h1>
          </div> 
        </div>
        <p className='feels-like'>(Feels Like {(weatherData.main.feels_like - 273.15).toFixed(2)}°C)</p>
        <hr />
          <ul className='other-details'>
          <li><FaGaugeSimpleHigh />Pressure: {weatherData.main.pressure} hPa</li> 
          <li><FaWind />{weatherData.wind.speed}WNM</li>    
          <li>Humidity: {weatherData.main.humidity}%</li>   
          </ul>
      </div>
    </div>
  );
};

export default WeatherPage;
