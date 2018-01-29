import React from 'react';
import ReactDOM from 'react-dom';

const Button = ({handleClick, text}) => (
	<button onClick={handleClick}>
		{text}
	</button>
)
const EnitenAania = ( {props, anek} ) => {
	let eniten = 0;
	let kohta = 0;
	
	for (let i = 0; i < props.pisteet.length; i++) {
		if (props.pisteet[i] > eniten) {
			kohta = i;
			eniten = props.pisteet[i];
		}
	}
	return (
		<div>
			<h2>
				Eniten ääniä:<br/>
				{anek[kohta]}
			</h2>
			has {eniten} votes
		</div>
	)
}

class App extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			selected: 0,
			pisteet: [0, 0, 0, 0, 0, 0]
		}
	}
	randomNumber = (size) => {
		let arvo = Math.floor((Math.random() * size) + 0)
		return () => {
			this.setState({selected: arvo})
		}
	}
	giveVote = (vote) => {
		return () => {
			const kopio = this.state.pisteet
			kopio[vote] += 1
		}
	}
	
	render() {
		return (
			<div>
				{this.props.anecdotes[this.state.selected]}<br/>
				<Button handleClick={this.giveVote(this.state.selected)}
				        text='vote'/>
				<Button handleClick={this.randomNumber(anecdotes.length)}
				        text='next'/>
				<EnitenAania props={this.state} anek={this.props.anecdotes}/>
			</div>
		)
	}
}

const anecdotes = [
	'If it hurts, do it more often',
	'Adding manpower to a late software project makes it later!',
	'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
	'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
	'Premature optimization is the root of all evil.',
	'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
	<App anecdotes={anecdotes} />,
	document.getElementById('root')
)
