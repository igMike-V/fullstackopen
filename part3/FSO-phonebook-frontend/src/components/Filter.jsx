// eslint-disable-next-line no-unused-vars
import React from 'react'
const Filter = ({ handleFilter, filter }) => {
  return (
    <div className="filter">
      <span>filter shown with:</span> <input className="filter" onChange={handleFilter} value={filter} />
    </div>
  )
}

export default Filter
