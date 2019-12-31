const jwt = require('jsonwebtoken')
const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        return authorization.substring(7)
    }
    return null
}

// get all blogs
blogRouter.get('/', async (request, response) => {
    const blogs = await Blog
        .find({})
        .populate('user', { username: 1, name: 1 })

    response.json(blogs.map(blog => blog.toJSON()))
})

// add new blog
blogRouter.post('/', async (request, response, next) => {
    const body = request.body
    // const token = getTokenFrom(request)
    const token = request.token
    
    const userResult = await User.find({})
    const user = userResult[0]

    try {
        const decodedToken = jwt.verify(token, process.env.SECRET)
        if (!token || !decodedToken.id) {
            return response.status(401).json({ error: 'token missing or invalid' })
        }

        const blog = new Blog({
            title: body.title,
            url: body.url,
            author: body.author,
            likes: 0,
            user: user.id
        })

        const savedBlog = await blog.save()
        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()
        response.status(201).json(savedBlog.toJSON())
    } catch(exception) {
        next(exception)
    }
})

// delete blog by id
blogRouter.delete('/:id', async (request, response, next) => {
    const token = request.token

    const userResult = await User.find({})
    const user = userResult[0]

    try {
        const decodedToken = jwt.verify(token, process.env.SECRET)
        if (!token || !decodedToken.id) {
            return response.status(401).json({ error: 'token missing or invalid' })
        }
        const blog = await Blog.findById(request.params.id)

        if ( blog.user.toString() !== user._id.toString() ) {
            return response.status(401).json({ error: 'You do not have permission to delete this blog' })
        }

        await Blog.findByIdAndRemove(request.params.id)
        response.status(204).end()
    } catch (exception) {
        next(exception)
    }
})

// update blog by id
blogRouter.put('/:id', async (request, response, next) => {
    const body = request.body

    const blog = {
        title: body.title,
        url: body.url
    }

    try {
        await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
        response.status(201).end()
    } catch (exception) {
        next(exception)
    }
})

module.exports = blogRouter