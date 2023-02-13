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

module.exports = { dummy, totalLikes, favoriteBlog }