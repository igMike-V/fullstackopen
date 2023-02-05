import React from "react"

const Weather = ({ weatherData, countryName }) => {
    if(weatherData.length === 0){
        return (<div>Loading Weather Data...</div>)
    }

    const directions = ["N","NNE","NE","ENE","E","ESE", "SE", "SSE","S","SSW","SW","WSW","W","WNW","NW","NNW"]
    
    const getWindDirection = (deg) => {
        return directions[Math.round(deg/22.5)%16]
    }

    return(
        <div className="weather">
            <h4>Current weather in {weatherData.name}, {countryName}:</h4>
            <div className="weather-data">
                <img src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt={weatherData.weather[0].description} />
                <div>
                    <p className="weather-temp">{weatherData.main.temp}°C (feels like{weatherData.main.feels_like}°C) </p>
                    <p className="weather-wind">Low: {weatherData.main.temp_min}°C | High: {weatherData.main.temp_min}°C | Wind: {weatherData.wind.speed}M/s from the {getWindDirection(weatherData.wind.deg)} </p>
                </div>
            </div>
        </div>
    )
}

export default Weather