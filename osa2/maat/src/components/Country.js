import React from 'react'

const Country = ({countries}) => {
	
	if (countries.length === 1) {
		return (
			<div>
			{countries[0].name} <br/>
				{countries[0].capital}<br/>
				{countries[0].population}
				<img src={countries[0].flag} />
			</div>
		)
	}
	if (countries.length < 10) {
	return (
		<div>
			<ul>
				{countries.map(c => <li key={c.name}>{c.name}</li>)}
			</ul>
		</div>
	)
	}
	return (
		<div>
			too many matches
		</div>
	)
}

export default Country
