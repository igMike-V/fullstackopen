import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import CountryDetails from './components/CountryDetails'
import SearchResults from './components/SearchResults'

function App() {
  // State declaration

  // Countries from API
  const [countries, setCountries] = useState([])
  // Search results
  const [searchResults, setSearchResults] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [countryFound, setCountryFound] = useState(false)

  // Controlled Form
  const [search, setSearch] = useState('')

  // Get countries from API
  useEffect(() => {
    const baseUrl = 'https://restcountries.com/v3.1'
    axios
      .get(`${baseUrl}/all`)
      .then(res => {
        setCountries(res.data)
      })
      .catch(error => error(error))
  }, [])

  const countryLookup = Object.keys(countries).map(key => ({id: key, name: countries[key].name.common.toLowerCase()}))
  
  const filterResults = () => {
    const matchedCountries = countryLookup.filter(country => country.name.match(search.toLowerCase()))
    const newSearchResults = matchedCountries.map(match => ({id: match.id, name: countries[match.id].name.common}))
    setSearchResults(newSearchResults)
  }

  // Run search filter on  search change
  useEffect(()=>{
    filterResults()
  }, [search])

  // Handle search change
  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }

  // Set selected country if only one result
  useEffect(()=>{
    if(searchResults.length === 1){
      setSelectedCountry(countries[searchResults[0].id])
      setCountryFound(true)
    } else {
      setSelectedCountry(null)
      setCountryFound(false)
    }
  }, [searchResults])
  
  // If the user clicks on a search result, set the selected country
  const handleCountrySelect = (id) => {
    setSelectedCountry(countries[id])
    setCountryFound(true)
  }
  
  return (
    <div className="App">
      <div className="search">
        Find countries: <input onChange={handleSearchChange} value={search}></input>
      </div>
      {!countryFound && <SearchResults searchResults={searchResults} handleCountrySelect={handleCountrySelect}  />} 
      {countryFound && <CountryDetails country={selectedCountry} />}
    </div>
  )
}

export default App
