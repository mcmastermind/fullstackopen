import React from 'react'
import Button from './Button'

const Person = ({ name, number, handleDeleteClick }) => {

    return (
        <div>
            {name} - {number} <Button onClick={handleDeleteClick} text='Delete'/>
        </div>
    )
}

export default Person