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
  if (blogs.length === 0) {
    return false
  }
  let blogStats = []
  blogs.forEach(blog => {
    let setKey = -1
    for(let i = 0; i < blogStats.length; i++){
      if (blogStats[i].author === blog.author){
        setKey = i
      }
    }
    if (setKey === -1){
      // not found
      blogStats.push({ author: blog.author, blogs: 1 })
    } else {
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

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs }