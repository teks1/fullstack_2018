import React from 'react'
import Osa from './Osa'

const Sisalto = ({osat}) => {
	
	const tehtavaMaara = osat.map(osa => osa.tehtavia);
	
	return (
		<div>
			<ul>
				{osat.map(osa => <Osa key={osa.id} osa={osa}/>)}
			
			Yhteensä {tehtavaMaara.reduce((prev, curr) => prev + curr)}
			</ul>
		</div>
		
	)
}

export default Sisalto
