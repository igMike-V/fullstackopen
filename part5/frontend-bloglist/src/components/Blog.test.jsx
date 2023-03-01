import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
//import { beforeEach, describe, test } from 'node:test'

describe('<Blog />', () => {
  let blog
  let user = {
    name: 'user2'
  }
  beforeEach(() => {
    blog = {
      author: "blog author",
      id: "63fdad4c0d53ed86444ecda3",
      likes: 4,
      title: "title of the blog",
      url: "example.com",
      user: 
        {
          name: 'Second User',
          username: 'user2',
          id: '63fdacef0d53ed86444ecd95'
        }
    }

   render(<Blog blog={blog} user={user} />)
  })

  test('renders blog\'s title and author but not the url or number of likes by default', () => {
    const mainContent = screen.getByText('title of the blog blog author')
    const url = screen.queryByText('example.com')
    const likes = screen.queryByText('likes: 4')
    expect(mainContent).toBeDefined()
    expect(url).not.toBeInTheDocument()
    expect(likes).not.toBeInTheDocument()
    
  })

  test('blog\'s URL and number of likes are shown when the button', async () => {
    const user = userEvent.setup()
    const showHideButton = screen.getByText('show')
    fireEvent.click(showHideButton)
    expect(screen.queryByText('example.com')).toBeInTheDocument()
    expect(screen.queryByText('likes: 4')).toBeInTheDocument()
  })

})

