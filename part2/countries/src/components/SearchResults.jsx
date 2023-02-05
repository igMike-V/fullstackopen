import React from "react"

const SearchResults = ({ searchDisplay }) => {
    return(
        <div className='search-results'>
            {searchDisplay.length > 10 ? 'Too many matches, specify another filter' : searchDisplay }
        </div>
    )
}
export default SearchResults