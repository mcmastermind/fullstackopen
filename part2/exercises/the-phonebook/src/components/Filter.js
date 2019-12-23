import React from 'react'

const Filter = ({ filterTerm, handleFilterChange }) => {

    return (
        <div>
            Filter shown with <input value={filterTerm} type='text' onChange={handleFilterChange} />
        </div>
    )
}

export default Filter