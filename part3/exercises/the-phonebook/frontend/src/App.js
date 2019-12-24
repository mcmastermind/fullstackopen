import React, { useState, useEffect } from 'react'
import Notification from './components/Notification';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import personService from './services/persons'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filterTerm, setFilterTerm] = useState('')
    const [notificationMessage, setNotificationMessage] = useState(null)
    const [notificationClass, setNotificationClass] = useState('success')

    const hook = () => {
        console.log('effect')
        personService
            .getAll()
            .then(response => {
                setPersons(response.data)
            })
    }
    useEffect(hook, [])

    const addPerson = (event) => {
        event.preventDefault()

        // empty field check
        if (newName === '' || newNumber === '' ) {
            alert('All fields are required for new entries.')
            return
        }

        // existing contact check
        let isInPhonebook = false
        persons.forEach((person) => {
            if( person.name === newName )
                isInPhonebook = true
        });
        if (isInPhonebook) {
            if (window.confirm(`${newName} is already added to the Phonebook. Do you want to replace the number with a new one?`)) {
                const personObj = persons.find(person => person.name === newName)
                personObj.number = newNumber
                personService
                    .update(personObj.id, personObj)
                    .then(returnedPerson => {
                        console.log(returnedPerson)
                        setPersons(persons.map(person => (person.id === personObj.id ? Object.assign(person, personObj) : person)))
                        setNewName('')
                        setNewNumber('')
                    })
                    .catch(error => {
                        setNotificationClass('error')
                        setNotificationMessage(
                            `Information of ${personObj.name} has already been removed.`
                        )
                        setTimeout(() => {
                            setNotificationMessage(null)
                        }, 3000)
                        setPersons(persons.map(person => (person.id === personObj.id ? Object.assign(person, personObj) : person)))
                        setNewName('')
                        setNewNumber('')
                    })
            } else {
                setNewName('')
                setNewNumber('')
            }
            return
            
        }
        const personObject = {
            name: newName,
            number: newNumber,
            id: persons.length + 1
        }
        personService
            .add( personObject )
            .then( returnedPerson => {
                setPersons(persons.concat(returnedPerson))
                setNewName('')
                setNewNumber('')
                setNotificationClass('success')
                setNotificationMessage(
                    `Added ${returnedPerson.name} to phonebook.`
                )
                setTimeout(() => {
                    setNotificationMessage(null)
                }, 3000)
            })
            .catch(error => {
                console.log(error.response.data)
                setNotificationClass('error')
                setNotificationMessage(
                    `${error.response.data.error}`
                )
                setTimeout(() => {
                    setNotificationMessage(null)
                }, 3000)
            })
    }

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    const handleFilterChange = (event) => {
        setFilterTerm(event.target.value)
    }

    const handleDeleteClick = (personObj) => {
        if (window.confirm(`Are you sure you want to delete ${personObj.name} from the phonebook?`)) {
            personService
                .remove(personObj.id)
                .then(response => {
                    console.log(response);
                    setPersons(persons.filter(person => person.id !== personObj.id))
                    setNotificationClass('success')
                    setNotificationMessage(
                        `${personObj.name} has been removed from the phonebook.`
                    )
                    setTimeout(() => {
                        setNotificationMessage(null)
                    }, 3000)
                })
                .catch(error => {
                    console.log(error)
                    setNotificationClass('error')
                    setNotificationMessage(
                        `Information of ${personObj.name} has already been removed.`
                    )
                    setTimeout(() => {
                        setNotificationMessage(null)
                    }, 3000)
                })
        }
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={notificationMessage} className={notificationClass}/>
            <Filter
                filterTerm={filterTerm}
                handleFilterChange={handleFilterChange}/>

            <h3>Add New</h3>
            <PersonForm 
                addPerson={addPerson} 
                newName={newName} 
                handleNameChange={handleNameChange} 
                newNumber={newNumber} 
                handleNumberChange={handleNumberChange}/>

            <h3>Numbers</h3>
            <Persons 
                persons={persons}
                filterTerm={filterTerm}
                handleDeleteClick={handleDeleteClick}
            />

    </div>
    )
}

export default App
