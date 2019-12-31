const Blog = require('../models/blog')

const initialBlogs = [
    {
        title: "New Blog Title",
        url: "New Blog Url",
        likes: 0
    },
    {
        title: "New Blog Title 2",
        url: "New Blog Url 2",
        likes: 8
    }
]

const nonExistingId = async () => {
    const blog = new Blog({ content: 'willremovethissoon' })
    await blog.save()
    await blog.remove()

    return blog._id.toString()
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

module.exports = {
    initialBlogs, nonExistingId, blogsInDb
}