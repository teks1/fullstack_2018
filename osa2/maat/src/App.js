import React from 'react'
import axios from 'axios'
import Country from './components/Country'


class App extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			countries: [],
			filteredCountries: [{name: 'lol'}],
			filter: ''
		}
		this.handleFilter = this.handleFilter.bind(this)
	}
	componentWillMount() {
		axios
			.get('https://restcountries.eu/rest/v2/all')
			.then(response => {
				console.log(response.data)
				this.setState({countries: response.data})
				
			})
		
	}
	handleFilter = (event) => {
		const countries = this.state.countries.filter(c => c.name.indexOf(this.state.filter) !== -1)
		this.setState({filter: event.target.value})
		this.setState({filteredCountries: countries})
	}
	render() {
		return (
			<div>
				<div>
					filter: <input value={this.state.filter} onChange={this.handleFilter}/>
				
				</div>
				<div>
					<Country countries={this.state.filteredCountries}/>
				</div>
			</div>
		)
	}
}

export default App;
