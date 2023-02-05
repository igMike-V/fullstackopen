import React from "react"
import Languages from "./Languages"
import Weather from "./Weather"


const CountryDetails = ({ country, weatherData }) => {
    return (
        <div className="country">
            <section className="name">
                <h2 className="name-common">{country.name.common}</h2>
                <p className="name-official">({country.name.official})</p>
            </section>
            <section className="info">
                <p className="info-capital"><span>Population: </span><span>{parseInt(country.population).toLocaleString()}</span></p>
                <p className="info-capital"><span>Capital: </span><span>{country.capital}</span></p>
                <p className="info-capital"><span>Area: </span><span>{parseInt(country.area).toLocaleString()}</span></p>
            </section>
            <Languages languages={country.languages} />
            <section className="flag">
                <img src={country.flags.svg} alt={country.flags.alt} />
            </section>
            <Weather weatherData={weatherData} countryName={country.name.common} />
        </div>
    )
}

export default CountryDetails