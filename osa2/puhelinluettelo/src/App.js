import React from 'react';
import Person from './components/Person'
import personsService from './services/persons'
import Notification from './components/Notification'

class App extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			persons: [],
			filteredPersons: [],
			newName: '',
			newNumber: '',
			filter: '',
			notification: null
		}
		this.addPerson = this.addPerson.bind(this)
	}
	componentWillMount() {
		personsService
			.getAll()
			.then(response => {
				this.setState({persons: response})
				this.setState({filteredPersons: response})
			})
	}
	
	handlePersonInput = (event) => {
		
		this.setState({newName: event.target.value})
		
	}
	handleNumberInput = (event) => {
		
		this.setState({newNumber: event.target.value})
	}
	handleFilter = (event) => {
		//this.setState({filter: event.target.value})
		const nimet = this.state.persons.filter(p => p.name.indexOf(this.state.filter) !== -1)
		
		this.state.filter.length === 0 ? this.setState({filteredPersons: this.state.persons}) : this.setState({filteredPersons: nimet})
		this.setState({filter: event.target.value})
	}
	
	addPerson = (event) => {
		event.preventDefault()
		const nimet = this.state.persons.filter(p => p.name === this.state.newName)
		console.log(nimet)
		//debugger
		
		const personObject = {
			name: this.state.newName,
			number: this.state.newNumber
		}
		nimet.length === 0 ?
			personsService
				.create(personObject)
				.then(newPerson => {
					this.setState({
						persons: this.state.persons.concat(personObject),
						newName: '',
						newNumber: '',
						notification: `lisattiin ${personObject.name}`
					})
					setTimeout(() => {
						this.setState({notification: null})
					}, 5000)
				})
			: this.setState({newName: '', newNumber: ''})
		
		
		//const persons = this.state.persons.concat(personObject)
		
		//nimet.length === 0 ? this.setState({persons, newName: '', newNumber: ''}) : this.setState({newName: '', newNumber: ''})
	}
	toggleDelete = (id) => {
		return () => {
			const person = this.state.persons.find(p => p.id === id)
			personsService.
			deleteId(id)
				.then(response => {
					this.setState({
						persons: response,
						notification: `poistettiin ${person.name}`
					})
					setTimeout(() => {
						this.setState({notification: null})
					}, 5000)
				})
		}
	}
	
	render() {
		return (
			<div>
				<h2>Puhelinluettelo</h2>
				<Notification message={this.state.notification}/>
				<div>
					filter: <input value={this.state.filter} onChange={this.handleFilter}/>
				</div><br/>
				<form onSubmit={this.addPerson}>
					<div>
						nimi: <input value={this.state.newName} onChange={this.handlePersonInput}/>
					</div>
					<div>
						numero: <input value={this.state.newNumber} onChange={this.handleNumberInput}/>
					</div>
					<div>
						<button type="submit">lisää</button>
					</div>
				</form>
				<h2>Numerot</h2>
				<ul>
					{this.state.filteredPersons.map(person => <Person key={person.name} person={person} toggleDelete={this.toggleDelete(person.id)}/>) }
				
				</ul>
			</div>
		)
	}
}

export default App
