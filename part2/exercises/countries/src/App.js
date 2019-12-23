import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Search from './components/Search'
import SearchResults from './components/SearchResults'

function App() {
    
    const [countries, setCountries] = useState([])
    const [filteredCountries, setFilteredCountries] = useState([])
    const [newSearch, setNewSearch] = useState('')

    const findCountryHook = () => {
        console.log('effect')
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(response => {
                console.log(response.data)
                setCountries(response.data)
            })
    }

    const handleSearchChange = (event) => {
        console.log(event.target.value)
        setNewSearch(event.target.value)
        setFilteredCountries(countries.filter(country => country.name.toUpperCase().indexOf(event.target.value.toUpperCase()) !== -1))
    }

    useEffect(findCountryHook, [])
    

    return (
        <>
            <Search newSearch={newSearch} handleSearchChange={handleSearchChange} />
            <SearchResults filteredCountries={filteredCountries} searchTerm={newSearch} />
        </>
    )
}

export default App
