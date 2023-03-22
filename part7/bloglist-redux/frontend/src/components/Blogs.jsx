import React, { useRef } from "react"

import BlogForm from './BlogForm'
import Toggle from './Toggle'
import Blog from './Blog'
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

const Blogs = () => {
  const blogFormRef = useRef()
  const user = useSelector(state => {
    return state.user
  })  

  const blogs = useSelector(state => state.blogs)
  if (!blogs || !user.user) { return null }
  
  return (
    <section className="blogs">
      <Toggle buttonLabel="New Blog" buttonClass="blog-form" ref={blogFormRef}>
        <BlogForm blogFormRef={blogFormRef} />
      </Toggle>

        <div className='blogs'>
          {blogs.map(blog => {
            return (
              <div className="blog-link" key={blog.id}>
                <Link to={`/blogs/${blog.id}`}>{`${blog.title} ${blog.author}`}</Link>
              </div>
            )
          }
          )}
        </div>

    </section>
  )
}

export default Blogs