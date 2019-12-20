import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ onClick, text }) => <button onClick={onClick} >{text}</button>
const VoteCount = ({ value }) => <div>has {value} votes</div>
const H2 = ({ text }) => <h2>{text}</h2>
const PopularAnecdote = ({ anecdotes, votes }) => {
    const index = votes.indexOf(Math.max(...votes));
    return (
        <>
            {anecdotes[index]}
            <VoteCount value={votes[index]} />
        </>
    )
}

const App = ({ anecdotes }) => {
    const [ selected, setSelected ] = useState(0)
    const [votes, setVotes] = useState(new Array(anecdotes.length + 1).join('0').split('').map(parseFloat)) 

    const getRandomAnecdote = () => {
        setSelected(Math.floor(Math.random() * (anecdotes.length - 1)))
    }
    const voteOnAnecdote = () => {
        const copy = [...votes]
        copy[selected] += 1
        setVotes(copy)
    }

    console.log(votes)
    return (
        <>
            <H2 text="Anecdote of the day"/>
            {anecdotes[selected]}
            <VoteCount value={votes[selected]} />
            <Button text='Vote' onClick={voteOnAnecdote} />
            <Button text='Random Anecdote' onClick={getRandomAnecdote} />

            <H2 text="Anecdote with the most votes" />
            <PopularAnecdote anecdotes={anecdotes} votes={votes} />
        </>
    )
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render( <App anecdotes={anecdotes} />, document.getElementById('root') )