const _ = require('lodash')

const dummy = (blogs) => {
    // nothing to really do with the array of blogs

    return 1
}

const totalLikes = (blogs) => {
    const sum = blogs.reduce((a, b) => a + (b.likes || 0), 0)

    return sum
}

const favoriteBlog = (blogs) => {
    const favorite = blogs.sort((a,b) => (a.likes < b.likes) ? 1 : -1)

    return favorite[0]
}

const mostBlogs = (blogs) => {
    const authorArray = _.map(blogs, 'author') //create an array of author values from the object array
    const mostCommonAuthor = _.head(_(authorArray)
        .countBy()
        .entries()
        .maxBy(_.last)) //find the most commonly occurring author value

    const totalBlogsByAuthor = blogs.filter(blog => blog.author === mostCommonAuthor)

    return {
        author: mostCommonAuthor,
        blogs: totalBlogsByAuthor.length
    }
}

const mostLikes = (blogs) => {

    const authorArray = {}

    blogs.forEach(blog => {
        if( authorArray[blog.author] ) {
            authorArray[blog.author] = authorArray[blog.author] + blog.likes
        } else {
            authorArray[blog.author] = blog.likes
        }
    })
    
    const most = Object.keys(authorArray).reduce((a, b) => authorArray[a] > authorArray[b] ? a : b);

    return {
        author: most,
        likes: authorArray[most]
    }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}