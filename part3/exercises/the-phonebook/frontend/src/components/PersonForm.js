import React from 'react'

const Form = ({ addPerson, newName, handleNameChange, newNumber, handleNumberChange }) => {

    return (
        <form onSubmit={addPerson}>
            <table>
                <tbody>
                    <tr>
                        <td>*Name:</td>
                        <td><input value={newName} onChange={handleNameChange} /></td>
                    </tr>
                    <tr>
                        <td>*Number:</td>
                        <td><input value={newNumber} onChange={handleNumberChange} /></td>
                    </tr>
                </tbody>
            </table>
            <div>
                <button type="submit">Add to Phonebook</button>
            </div>
        </form>
    )
}

export default Form