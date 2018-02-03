import React from 'react'

const Person = ({person, toggleDelete}) => {
	return (
		<li>
			{person.name} {person.number} <button onClick={toggleDelete}>Poista</button>
		</li>
	)
}

export default Person
