import React from "react"

const SearchResults = ({ searchResults, handleCountrySelect }) => {
    const searchDisplay = searchResults.map(country => {
        return (
            <div className='search-result' key={country.id}>
                {country.name}
                <button onClick={() => handleCountrySelect(country.id)}>show</button>
            </div>
        )
        
    })
    return(
        <div className='search-results'>
            {searchDisplay.length > 10 ? 'Too many matches, specify another filter' : searchDisplay }
        </div>
    )
}
export default SearchResults