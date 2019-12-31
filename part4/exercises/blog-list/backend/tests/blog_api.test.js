const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

    await Blog.deleteMany({})

    const blogObjects = helper.initialBlogs
        .map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
})

test('blogs are returned as json', async () => {
    console.log('entered test')
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body.length).toBe(helper.initialBlogs.length)
})

test('a valid blog can be added ', async () => {
    const newBlog = {
        title: 'New Blog Title 3',
        url: 'New Blog Url 3',
        // likes: 0 // removed for like property test
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)

    const title = blogsAtEnd.map(n => n.title)
    expect(title).toContain(
        'New Blog Title 3'
    )
})

test('blogs contain ID property', async () => {
    const response = await api.get('/api/blogs')
    for (let i = 0; i < response.body.length; i++) {
        expect(response.body[i].id).toBeDefined()
    }
})

test('blogs contain like property, if not, sets it to zero', async () => {
    const response = await api.get('/api/blogs')

    for (let i = 0; i < response.body.length; i++) {
        expect(response.body[i].likes).toBeDefined()
    }
})

test('blog without title and url is not added', async () => {
    const newBlog = {
        // title: 'New Blog Title 4',
        // url: 'New Blog Url 4',
        likes: 0
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length)
})


test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd.length).toBe(
        helper.initialBlogs.length - 1
    )

    const title = blogsAtEnd.map(r => r.title)

    expect(title).not.toContain(blogToDelete.title)
})


test('updates blog by id', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    const blog = {
        title: 'Updated Blog Title',
        url: 'http://UPDATED-URL.com'
    }

    await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(blog)
        .expect(201)

    const blogsAtEnd = await helper.blogsInDb()

    const title = blogsAtEnd.map(r => r.title)

    expect(title).toContain(blog.title)
})

afterAll(() => {
    mongoose.connection.close()
})