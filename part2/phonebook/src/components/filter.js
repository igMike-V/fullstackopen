import React from "react";

  //filter component
  const Filter = ({onChange, filter, text}) => (
    <div>
      {text} <input value={filter} onChange={onChange} />
    </div>
  )

  export default Filter