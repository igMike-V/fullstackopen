import React from "react";

const PersonForm = ({props}) => (
    <form onSubmit={props.submitAction}>
    <div>
      {props.inputs.map(input => {
        return (
         <div key={input.id}>
         {input.label} : <input value={input.value} onChange={input.onChange} />
         <br />
         </div>
        )
      })}
    </div>
    <div>
      <button type="submit">{props.buttonText}</button>
    </div>
    </form>
  )

  export default PersonForm