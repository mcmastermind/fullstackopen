import React from 'react'
import Person from './Person'

const Persons = ({ persons, filterTerm, handleDeleteClick }) => {

    const rows = () => {
        if (filterTerm.length > 0) {
            let copy = persons.filter(person => person.name.toLowerCase().indexOf(filterTerm.toLowerCase()) > -1)
            return copy.map(person => <Person key={person.id} name={person.name} number={person.number} handleDeleteClick={() => handleDeleteClick(person)} />)
        } else {
            return persons.map(person => <Person key={person.id} name={person.name} number={person.number} handleDeleteClick={() => handleDeleteClick(person)} />)
        }
    }

    return (
        <>
            {rows()}
        </>
    )
}

export default Persons