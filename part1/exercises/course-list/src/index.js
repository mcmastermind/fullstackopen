import React from 'react';
import ReactDOM from 'react-dom';


const Header = (props) => {
    console.log('Header props', props)
    return (
        <>
            <h1>{props.course.name}</h1>
        </>
    )
}

const Part = (part) => {
    console.log('Part props', part)
    return (
        <p>{part.name} {part.exercises}</p>
    )
}

const Content = (props) => {
    console.log('Content props', props)
    let parts = [] 
    props.parts.forEach(part => {
        parts.push(<Part name={part.name} exercises={part.exercises} />)
    })
    return (
        <>
            {parts}
        </>
    )
}

const Total = (props) => {
    console.log('Total props', props)
    let total = 0;
    props.course.parts.forEach(part => {
        total+=part.exercises
    })
    return (
        <>
            <p>Number of exercises {total}</p>
        </>
    )
}

const App = () => {
    
    const course = {
        name: 'Half Stack application development',
        parts: [
            {
                name: 'Fundamentals of React',
                exercises: 10
            },
            {
                name: 'Using props to pass data',
                exercises: 7
            },
            {
                name: 'State of a component',
                exercises: 14
            }
        ]
    }
    
    return (
        <div>
            <Header course={course}/>
            <Content parts={course.parts}/>
            <Total course={course} /> 
        </div>    
    )
}

ReactDOM.render(<App/>, document.getElementById('root'))