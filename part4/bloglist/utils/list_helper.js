const dummy = (blogs) => {
  console.log(blogs)
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => {
    return sum + blog.likes
  }, 0)
}

const favoriteBlog = (blogs) => {
  const favBLog = blogs.reduce((prev, next) => {
    return next.likes > prev.likes ? next : prev
  }, { likes: 0 })
  return {
    title: favBLog.title,
    author: favBLog.author,
    url: favBLog.url,
    likes: favBLog.likes
  }
}

const mostBlogs = (blogs) => {
  // Return false if empty array
  if (blogs.length === 0) {
    return false
  }
  let blogStats = []
  // Create an array of blog authors with total blogs each
  blogs.forEach(blog => {
    let setKey = -1
    for(let i = 0; i < blogStats.length; i++){
      if (blogStats[i].author === blog.author){
        setKey = i
      }
    }
    // Check if author was found (!= -1)
    if (setKey === -1){
      // Not found, push to array
      blogStats.push({ author: blog.author, blogs: 1 })
    } else {
      // Author was in array, increment blogs
      blogStats[setKey].blogs ++
    }
  })
  // Find the highest number of blogs among array objects
  const returnBlog = blogStats.reduce((prev, next) => {
    if (next.blogs > prev.blogs){
      return next
    } else {
      return prev
    }
  }, blogStats[0])
  return returnBlog
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return false
  }

  let blogStats = []
  // Create an array of blog authors with total blogs each
  blogs.forEach(blog => {
    let setKey = -1
    for(let i = 0; i < blogStats.length; i++){
      if (blogStats[i].author === blog.author){
        setKey = i
      }
    }
    // Check if author was found (!= -1)
    if (setKey === -1){
      // Not found, push to array
      blogStats.push({ author: blog.author, likes: blog.likes })
    } else {
      // Author was in array, increment blogs
      blogStats[setKey].likes += blog.likes
    }
  })
  // Find the highest number of blogs among array objects
  const returnBlog = blogStats.reduce((prev, next) => {
    if (next.likes > prev.likes){
      return next
    } else {
      return prev
    }
  }, blogStats[0])
  return returnBlog


}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }