import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({ country }) => {

    const [ weatherDetails, setWeatherDetails] = useState()

    const hook = () => {
        axios
        .get('http://api.weatherstack.com/current?access_key=' + process.env.REACT_APP_WEATHER_API_KEY + '&query=' + country.capital + ' ' + country.name)
        .then(response => {
            console.log(response.data)
            setWeatherDetails(response.data)
        })
    }
    useEffect(hook, [])

    if(weatherDetails){
        return (
            <>
                <h3>Weather in {country.capital}</h3>
                <p><b>Temperature:</b> {weatherDetails.current.temperature} Celsius</p>
                <img src={weatherDetails.current.weather_icons[0]} /><br /><span>{weatherDetails.current.weather_descriptions}</span>
                <p><b>Wind:</b> {weatherDetails.current.wind_speed} kph - Direction {weatherDetails.current.wind_dir}</p>
            </>
        )
    } else {
        return (<p>loading weather information</p>)
    }
}

export default Weather