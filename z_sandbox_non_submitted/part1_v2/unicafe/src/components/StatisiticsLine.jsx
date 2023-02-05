import React from "react"

export default function StatisiticsLine(props){
    return (
        <tr>
            <td>{props.label}</td>
            <td>{props.value}</td>
        </tr>
    )
}
