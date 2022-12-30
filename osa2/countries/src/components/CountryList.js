import React, { useState } from 'react'
import Weather from './Weather'

const CountryList = ({ countriesToShow }) => {

    const [selectedCountry, setSelectedCountry] = useState('')

    const handleClick = (event) => {
      console.log('event.target.value:', event.target.value)
      setSelectedCountry(event.target)
    }


    if (countriesToShow.length > 10) {
      return (
        <p>Too many matches, specify another filter</p>
      )
    }

    if (countriesToShow.length === 1) {
      return (
        <div>
          <h2>{countriesToShow[0].name.common}</h2>
          <ul>
            <li>capital {countriesToShow[0].capital}</li>
            <li>area {countriesToShow[0].area}</li>
            <li>population {countriesToShow[0].population}</li>
          </ul>

          <h3>languages</h3>
          <ul>
            {Object.values(countriesToShow[0].languages).map(language => <li key={language}>{language}</li>)}
          </ul>
            
          <p>
            <img src={countriesToShow[0].flags.png}></img>
          </p>
          <Weather capital={countriesToShow[0].capital}></Weather>
        </div>
      )
    }

    if (selectedCountry !== '') {
      countriesToShow = countriesToShow.filter(country => country.name.common === selectedCountry.value)
      if (countriesToShow.length != 0) {
        return (
          <div>
            <h2>{countriesToShow[0].value}</h2>
            <ul>
              <li>capital {countriesToShow[0].capital}</li>
              <li>area {countriesToShow[0].area}</li>
              <li>population {countriesToShow[0].population}</li>
            </ul>

            <h3>languages</h3>
            <ul>
              {Object.values(countriesToShow[0].languages).map(language => <li key={language}>{language}</li>)}
            </ul>
            
            <p>
              <img src={countriesToShow[0].flags.png}></img>
            </p>
            <Weather capital={countriesToShow[0].capital}></Weather>
          </div>
        )
      }
        
    }

    return (
      countriesToShow.map(country => <li key={country.cca2}>{country.name.common}
        <button value={country.name.common} onClick={handleClick}>show</button>
      </li>)
    )
  }

  // API 768056dc814f35451e4b94d285ec3337
  
  export default CountryList