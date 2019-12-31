const bcrypt = require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('../models/user')

// get all users
usersRouter.get('/', async (request, response) => {
    const users = await User
        .find({})
        .populate('blogs')
    response.json(users.map(u => u.toJSON()))
})

// add new user
usersRouter.post('/', async (request, response, next) => {
    try {
        const body = request.body
        
        if (!body.password) {
            return response.status(401).json({ error: 'Password is required' })
        }

        if (body.password && body.password.length < 3 ) {
            return response.status(401).json({ error: 'Password must be at least 3 characters' })
        }

        const saltRounds = 10
        const passwordHash = await bcrypt.hash(body.password, saltRounds)

        const user = new User({
            username: body.username,
            name: body.name,
            passwordHash,
        })

        const savedUser = await user.save()

        response.json(savedUser)
    } catch (exception) {
        next(exception)
    }
})

module.exports = usersRouter