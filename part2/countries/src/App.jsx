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
  // Sets single country to load details
  const [selectedCountry, setSelectedCountry] = useState(null)
  // Set to true when a country is selected to trigger effects
  const [countryFound, setCountryFound] = useState(false)
  // Weather data from openweathermap.org API
  const [weatherData, setWeatherData] = useState([])

  // Controlled Form
  const [search, setSearch] = useState('')

  useEffect(() => {
    if(!countryFound){
      return
    }
    axios
      .get(`http://api.openweathermap.org/data/2.5/weather?q=${selectedCountry.capital}&appid=${import.meta.env.VITE_WEATHER_API_KEY}&units=metric`)
      .then(res => setWeatherData(res.data))
      .catch(error => console.error(error))
  }, [countryFound])

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

  // Array of country keys and names
  const countryLookup = Object.keys(countries).map(key => ({id: key, name: countries[key].name.common.toLowerCase()}))
  
  // Get a list of countries that match the search criteria
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
      {countryFound && <CountryDetails country={selectedCountry} weatherData={weatherData} />}
    </div>
  )
}

export default App
