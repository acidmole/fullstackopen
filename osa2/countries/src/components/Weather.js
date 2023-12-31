import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({ capital }) => {
  const [weather, setWeather] = useState([])

  const api_key = process.env.REACT_APP_API_KEY
    const url = `http://api.weatherstack.com/current?access_key=${api_key}&query=${capital}`
    
    useEffect(() => {
        axios
            .get(url)
            .then(response => {
            console.log('promise fulfilled')
            setWeather(response.data)
            })
        }, [url])

    console.log('weather:', weather)

    if (weather.length === 0) {
        return (
            <div>
                No weather data available
            </div>
        )
    }

    return (
        <div>
            <h3>Weather in {capital}</h3>
            <p>temperature is {weather.current.temperature} degrees Celsius</p>
            <img src={weather.current.weather_icons[0]}></img>
            <p>wind gusting at {weather.current.wind_speed} from {weather.current.wind_dir}</p>
        </div>
    )
}

export default Weather