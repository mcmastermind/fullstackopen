import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

const H2 = ({ text }) => <h2>{text}</h2>

const Statistic = ({ text, value, suffix, alwaysOn }) => {
    return (
        <tr><td>{text.charAt(0).toUpperCase() + text.substring(1)}:</td><td>{value}{suffix}</td></tr>
    )
}

const Statistics = ({ clicks, totalClicks}) => {
    console.log(clicks)
    let average = 0
    let positive = 0

    average = (clicks.good - clicks.bad) / totalClicks
    positive = (clicks.good / totalClicks) * 100;

    if (totalClicks === 0 ) {
        return (
            <>
                <div> No feedback given yet.</div>
            </>
        )
    } else {
        return (
            <>
                <table>
                    <Statistic text="Positive Feedback" value={clicks.good}/>
                    <Statistic text="Neutral Feedback" value={clicks.neutral}/>
                    <Statistic text="Negative Feedback" value={clicks.bad}/>
                    <Statistic text="Average Feedback" value={average} />
                    <Statistic text="Positive Percentage" value={positive} suffix="%"/>
                </table>
            </>
        )
    }
    
}

const App = () => {

    const [clicks, setClicks] = useState({
        good: 0, neutral: 0, bad: 0
    })
    let [ totalClicks, setTotalClicks ] = useState(0)

    const handleGoodClick = () =>{ 
        setClicks({ ...clicks, good: clicks.good + 1 })
        setTotalClicks(totalClicks+=1)
    }
    const handleNeutralClick = () => {
        setClicks({ ...clicks, neutral: clicks.neutral + 1 })
        setTotalClicks(totalClicks += 1)
    }
    const handleBadClick = () => {
        setClicks({ ...clicks, bad: clicks.bad + 1 })
        setTotalClicks(totalClicks += 1)
    }

    return (
        <>
            <H2 text="Give Feedback" />
            <Button onClick={handleGoodClick} text="Good" />
            <Button onClick={handleNeutralClick} text="Neutral" />
            <Button onClick={handleBadClick} text="Bad" />
            <H2 text="Statistics" />
            <Statistics clicks={clicks} totalClicks={totalClicks}/>
        </>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));