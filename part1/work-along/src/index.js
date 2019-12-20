import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Heading = ({ text }) => <h1>{ text }</h1>

const Hello = ({ name, age }) => {
    const bornYear = () => new Date().getFullYear() - age

    return (
        <div>
            <p>Hola {name}, you are {age} years old!</p>
            <p>So you were probably born in {bornYear()}</p>
        </div>
    )
}

const Footer = (props) => {
    return (
        <div>
            <p>Greeting app created by <a href="https://github.com/mcmastermind">KingKode</a></p>
        </div>
    )
}

const Display = ({ counter }) => <p><b>Counter = {counter}</b></p>

const Button = ({ onClick, text }) => <button onClick={onClick} >{text}</button>

const History = ({ allClicks }) => {
    if (allClicks.length === 0) {
        return (
            <div>
                The app is used by pressing the buttons above
            </div>
        )
    }

    return (
        <div>
            Button press history:<br/> {allClicks.join(' ')}
        </div>
    )
}

const ValueDisplay = ({value}) => <p>Value = {value}</p>

const Section = ({ name }) => <h3>{ name }</h3>

const SectionSplitter = () => <><br/><hr/></>

// Fragment used to avoid div wrapper
const App = (props) => {
    const [ counter, setCounter ] = useState(0)
    const name = 'Peter'
    const age = 10

    const setToValue = (value) => setCounter(value)

    const [left, setLeft] = useState(0)
    const [right, setRight] = useState(0)

    const [clicks, setClicks] = useState({
        left: 0, right: 0
    })

    const [ allClicks, setAll ] = useState([])



    // const handleLeftClick = () => setClicks({ ...clicks, left: clicks.left + 1 })
    // const handleRightClick = () => setClicks({ ...clicks, right: clicks.right + 1 })

    const handleLeftClick = () => {
        setAll(allClicks.concat('L'))
        setLeft(left + 1 )
    }
    const handleRightClick = () => {
        setAll(allClicks.concat('R'))
        setRight(right + 1)
    }


    const hello = (who) => () => console.log('hello', who)


    const [value, setValue] = useState(0)

    const setToNewValue = (newValue) => setValue(newValue)


    return (
        <>
            <Section name="Part 1.a" />
            <Heading text="Greetings"/>
            <Hello name="Maya" age={26 + 10} />
            <Hello name={name} age={age} />
            <Footer />


            <SectionSplitter/>
            <Section name="Part 1.c" />
            <Display counter={counter} />
            <Button onClick={() => setToValue(counter + 1)} text="Increase Counter" />
            <Button onClick={() => setToValue(counter - 1)} text="Decrease Counter" />
            <Button onClick={() => setToValue(0)} text="Reset Counter" />
            
            <SectionSplitter />

            <Section name="Part 1.d" />
            
            <b> {left} </b>
            <Button onClick={handleLeftClick} text="Increase Left" />
            <Button onClick={handleRightClick} text="Increase Right" />
            <b> {right} </b>
            <History allClicks={allClicks}/>
                
            <SectionSplitter />

            <Button onClick={hello('World')} text="Hello Button" />
            <Button onClick={hello('React')} text="Hello Button" />
            <Button onClick={hello('Function')} text="Hello Button" />

            <SectionSplitter />

            <ValueDisplay value={value}/>
            <Button onClick={() => setToNewValue(1000)} text="Thousand" />
            <Button onClick={() => setToNewValue(0)} text="Reset" />
            <Button onClick={() => setToNewValue(value+1)} text="Increment" />

        </>
    )
}

let counter = 1

ReactDOM.render(<App counter={counter} />, document.getElementById('root'))


/*
// Single containing element
const App = () => {
    const name = 'Peter'
    const age = 10

    return (
        <div>
            <h1>Greetings</h1>
            <Hello name="Maya" age={26 + 10} />
            <Hello name={name} age={age} />
            <Footer />
        </div>
    )
}
*/

/*
// Using dynamic content
const App = () => {
    console.log('Hola from component')
    const now = new Date()
    const a = 10
    const b = 20

    return (
        <div>
            <p>Hello World, it is now {now.toString()}</p>
            <p>
                {a} plus {b} is {a+b}
            </p>
        </div>
    )
}
*/


/* 
// Array of elements opposed to single containing element
const App = () => {
    return [
        <h1>Greetings</h1>,
        <Hello name="Maya" age={26 + 10} />,
        <Footer />
    ]
}
*/

/* 
// Fails due to no containing element
const App = () => {
    const name = 'Peter'
    const age = 10

    return (
            <h1>Greetings</h1>
            <Hello name="Maya" age={26 + 10} />
            <Hello name={name} age={age} />
            <Footer />
    )
}
*/