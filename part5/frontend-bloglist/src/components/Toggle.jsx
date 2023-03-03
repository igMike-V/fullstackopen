import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Toggle = forwardRef((props, refs) => {
  useImperativeHandle(refs, () => {
    return {
      toggleVisibility
    }
  })

  const [visble, setVisible] = useState(false)

  const hideWhenVisible = { display: visble ? 'none' : '' }
  const showWhenVisible = { display: visble ? '' : 'none' }
  const toggleVisibility = () => {
    setVisible(!visble)
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        <button className={props.buttonClass} onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button className={props.buttonClass} onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )
})

Toggle.displayName = 'Toggle'

Toggle.propTypes =  {
  buttonLabel: PropTypes.string.isRequired
}

export default Toggle