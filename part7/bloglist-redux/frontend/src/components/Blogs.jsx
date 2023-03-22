import React, { useRef } from "react"

import BlogForm from './BlogForm'
import Toggle from './Toggle'
import Blog from './Blog'

const Blogs = ({ user, blogs }) => {
  const blogFormRef = useRef()

  return (
    <section className="blogs">
      <Toggle buttonLabel="New Blog" buttonClass="blog-form" ref={blogFormRef}>
        <BlogForm blogFormRef={blogFormRef} />
      </Toggle>

        <div className='blogs'>
          {blogs.map(blog => {
            return (
              <Blog key={blog.id} blog={blog} user={user} />
            )
          }
          )}
        </div>

    </section>
  )
}

export default Blogs