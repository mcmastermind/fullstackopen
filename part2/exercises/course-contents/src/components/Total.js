import React from 'react'

const Total = (props) => {
    console.log('Total props', props)
    const total = Object.values(props.parts).reduce((t, { exercises }) => t + exercises, 0)

    return (
        <p><b>Total number of exercises {total}</b></p>
    )
}

export default Total