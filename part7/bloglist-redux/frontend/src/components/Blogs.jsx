import React, { useRef } from "react"

import BlogForm from './BlogForm'
import Toggle from './Toggle'
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

import { Table } from 'react-bootstrap'

const Blogs = () => {
  const blogFormRef = useRef()
  const user = useSelector(state => {
    return state.user
  })  

  const blogs = useSelector(state => state.blogs)
  if (!blogs || !user.user) { return null }
  
  return (
    <section className="blogs">
      <div className="container">
        <h2>Bloglist</h2>
        <Toggle buttonLabel="New Blog" buttonClass="blog-form" ref={blogFormRef}>
          <BlogForm blogFormRef={blogFormRef} />
        </Toggle>

        <div className='blogs'>
          <Table striped>
            <tbody>
              {blogs.map(blog => {
                return (
                  <tr className="blog-link" key={blog.id}>
                    <td>
                      <Link to={`/blogs/${blog.id}`}>
                        {blog.title}
                      </Link>
                    </td>
                    <td>
                      {blog.author}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
            
          </div>
      </div>
    </section>
  )
}

export default Blogs