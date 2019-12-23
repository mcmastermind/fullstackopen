import React from 'react'
import Weather from './Weather'

const CountryDetails = ({ country }) => {
    if(country) {
        return (
            <div>
                <div><h2>{country.name}</h2></div>
                <table>
                    <tbody>
                        <tr>
                            <td>Capital : </td>
                            <td>{country.capital}</td>
                        </tr>
                        <tr>
                            <td>Population : </td>
                            <td>{country.population}</td>
                        </tr>
                    </tbody>
                </table>
                <h3>Languages</h3>
                <ul>
                    {country.languages.map((language, i)=> <li key={i}>{language.name}</li> )}
                </ul>
                <img src={country.flag} width='100'/>
                <Weather country={country} />
            </div>
        )
    } else {
        return(<></>)
    }
}

export default CountryDetails