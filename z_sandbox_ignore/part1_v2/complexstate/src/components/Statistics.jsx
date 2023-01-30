import React from 'react'
import StatisiticsLine from './StatisiticsLine'

function Statistics(props) {
    const {good, neutral, bad} = props

    const getTotal = () => good + neutral + bad

    const getAverage = () => (good - bad) / getTotal()

    const getPositvePercent = () => (good / getTotal()) * 100

    return (
        <table className="stats">
        <thead></thead>
            <tbody>
                <StatisiticsLine label="good" value={good}/>
                <StatisiticsLine label="neutral" value={neutral}/>
                <StatisiticsLine label="bad" value={bad}/>
                <tr>
                    <td>all</td>
                    <td>{getTotal()}</td>
                </tr>
                <tr>
                    <td>average</td>
                    <td>{getAverage()}</td>
                </tr>
                <tr>
                    <td>positve</td>
                    <td>{getPositvePercent()} %</td>
                </tr>
            </tbody>
            <tfoot></tfoot>
      </table>
    )
}

export default Statistics