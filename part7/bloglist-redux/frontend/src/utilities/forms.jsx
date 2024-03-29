const formHandler = (setFormState, event) => {
  setFormState(prev => {
    return { ...prev, [event.target.name] : event.target.value }
  })
}

const resetForm = (setFormState) => {
  setFormState(prev => {
    let newLoginState = { ...prev }
    Object.keys(newLoginState).forEach(key => {newLoginState[key] = ''})
    return newLoginState
  })
}

export default {
  formHandler,
  resetForm
}