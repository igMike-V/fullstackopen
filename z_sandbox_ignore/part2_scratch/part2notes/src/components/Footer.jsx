import React from "react"

const Footer = () => {
    const footerStyle = {
        color: 'green',
        fontStyle: 'italic',
        fontSize: 16,
    }
    
    const currentYear = new Date().getFullYear()

    return (
        <div style={footerStyle}>
            <br />
            <em>Note app, Department of Computer Science, University of Helsinki {currentYear} </em>
        </div>
    )
}

export default Footer