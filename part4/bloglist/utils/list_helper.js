const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
 return blogs.reduce( (acc, b) => acc + b.likes, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.reduce( (a,b) => a.likes > b.likes ? a : b )
}

const mostBlogs = (blogs) => {
    const authorsBlogs = []
    blogs.forEach(blog => {
      const index = authorsBlogs.findIndex( b => b.author === blog.author)
      if (index >= 0) {
        authorsBlogs[index].blogs = authorsBlogs[index].blogs + 1
      } else {
        authorsBlogs.push({author:blog.author, blogs:1})
      }
    })
    
  return authorsBlogs.reduce( (a,b) => a.blogs > b.blogs ? a : b , {author:"", blogs:0})
}

const mostLikes = (blogs) => {
  const authorsBlogs = []
    blogs.forEach(blog => {
      const index = authorsBlogs.findIndex( b => b.author === blog.author)
      if (index >= 0) {
        authorsBlogs[index].likes = authorsBlogs[index].likes + blog.likes
      } else {
        authorsBlogs.push({author:blog.author, likes:blog.likes})
      }
    })
    
  return authorsBlogs.reduce( (a,b) => a.likes > b.likes ? a : b , {author:"", likes:0})
}
module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}