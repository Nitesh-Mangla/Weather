import React, { useState } from 'react';
import axios from 'axios';
import './weather.css'

const Weather = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [city, setCity] = useState('');
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [weatherData, setWeatherData] = useState(null);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [error, setError] = useState(null);

    const API_KEY = '';

    const handleChange = (event) => {
        setCity(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
            );
            setWeatherData(response.data);
            setError(null);
        } catch (error) {
            setWeatherData(null);
            setError('City not found');
        }
    };

    return (
        <>
            <h1>Weather Dashboard</h1>
            <div className="container">
                <div className="weather-input">
                    <h3>Enter a City Name</h3>
                    <input className="city-input" onChange={(e) => {handleChange(e)}} type="text" placeholder="E.g., Delhi, Gurgaon ..." />
                        <button className="search-btn" onClick={(e) => {handleSubmit(e)}}>Search</button>
                        {/*<div className="separator"></div>*/}
                </div>
                <div className="weather-data">
                    <div className="current-weather">
                        <div className="details">
                            <h2>{weatherData?.name}</h2>
                            <h6>Temperature: {weatherData?.main?.temp}°C</h6>
                            <h6>Wind: {weatherData?.wind?.speed} M/S</h6>
                            <h6>Humidity: {weatherData?.main?.humidity}%</h6>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Weather