const Blog = require('../models/blog')

// Initial Blog data
const initialBlogs = [
  {
    author: 'Mike Vautour',
    title: 'Super Awesome Blog',
    url: 'https://superawesomeblog.com',
    likes: 15
  },
  {
    author: 'Don Draper',
    title: 'Crap blog',
    url: 'https://absolutecrapblog.com',
    likes: 1
  },
  {
    author: 'Don Draper',
    title: 'Advertising Blog',
    url: 'https://adblog.com',
    likes: 5
  }
]

const blogsInDB = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs,
  blogsInDB
}