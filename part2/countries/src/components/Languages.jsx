import React from 'react'

const Languages = ({ languages }) => {
    console.log(languages)
    const languageDisplay = Object.keys(languages).map(key => <li key={key}>{languages[key]}</li>)
    return(
        <div className="languages">
            <h4>Languages:</h4>
            <ul>
                {languageDisplay}
            </ul>
        </div>   
    )

}
export default Languages