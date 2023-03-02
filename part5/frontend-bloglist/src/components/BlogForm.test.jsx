import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './blogForm'

const mockCreateBlog = jest.fn()
const setup = () => {
  const utils = render(<BlogForm createBlog={mockCreateBlog}  />)
  const inputUrl = screen.getByLabelText('url')
  const inputAuthor = screen.getByLabelText('author')
  const inputTitle = screen.getByLabelText('title')
  const submit = screen.getByText('Create')
  return {
    inputUrl,
    inputAuthor,
    inputTitle,
    submit,
    ...utils,
  }
}



test.only('that the form calls the event handler it received as props with the right details when a new blog is created', () => {

  const { 
    inputUrl,
    inputAuthor,
    inputTitle,
    submit
  } = setup()

  
  fireEvent.change(inputUrl, { target: { value: 'www.mrhappy.com' } })
  fireEvent.change(inputAuthor, { target: { value: 'Sampson Simpson' } })
  fireEvent.change(inputTitle, { target: { value: 'Right near the beach' } })
  userEvent.tab()
  expect(inputUrl.value).toBe('www.mrhappy.com')
  expect(inputAuthor.value).toBe('Sampson Simpson')
  expect(inputTitle.value).toBe('Right near the beach')
  fireEvent.click(submit)
  expect(mockCreateBlog).toHaveBeenCalledWith({ title: 'Right near the beach', author: 'Sampson Simpson', url: 'www.mrhappy.com' })
  

  
})