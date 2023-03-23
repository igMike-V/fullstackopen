import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

import { Button } from 'react-bootstrap'

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
        <Button variant='secondary' className={`${props.buttonClass}-show`} onClick={toggleVisibility}>{props.buttonLabel}</Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button variant='secondary' className={`${props.buttonClass}-hide`} onClick={toggleVisibility}>cancel</Button>
      </div>
    </div>
  )
})

Toggle.displayName = 'Toggle'

Toggle.propTypes =  {
  buttonLabel: PropTypes.string.isRequired
}

export default Toggle