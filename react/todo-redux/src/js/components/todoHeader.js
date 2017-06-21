import React from 'react';
import { PropTypes } from 'prop-types';

export default class TodoHeader extends React.Component {
	handleClick(e) {
		if(e.keyCode === 13) {
			const input = this.refs.input;
			const text = input.value.trim();
			if(text) {
				this.props.onAddTodo(text);
				input.value = '';
			}
		}
	}
	render() {
		return(
			<header className="header">
				<h1>Todos</h1>
				<input className="new-todo" placeholder="what needs to be done" ref="input" onKeyUp={this.handleClick.bind(this)} />
			</header>
		);
	}
}

TodoHeader.propTypes = {
	onAddTodo: PropTypes.func.isRequired
};