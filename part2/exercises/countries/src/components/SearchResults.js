import React, { useState } from 'react'
import CountryDetails from './CountryDetails'

const SearchResults = ({ filteredCountries, searchTerm }) => {
    const [showCountry, setShowCountry] = useState()

    const handleShowDetails = (country) => {
        setShowCountry(country)
    }

    if (searchTerm === '') {
        return (
            <div>
                Use the field above to search countries.
            </div>
        )
    }
    if (filteredCountries.length === 0 ) {
        return (
            <div>
                No Results Found.
            </div>
        )
    }
    if( filteredCountries.length > 10 ) {
        return (
            <div>
                Too many matches. Specify another filter.
            </div>
        )
    } else if (filteredCountries.length > 1) {

        return (
            <>
                {filteredCountries.map((country, i) => <div key={i}>{country.name} <button onClick={() => handleShowDetails(country)}>Show Details</button></div>)}
                <CountryDetails country={showCountry} />
            </>
        )
    } else {
        const country = filteredCountries[0]
        return (
            <>
                <CountryDetails country={country} />
            </>
        )
    }
}

export default SearchResults