import React from "react";

export default class TodoHeader extends React.Component {
	addTodo(e) {
		if(e.keyCode === 13) {
			let newTodo = {
				completed: false, 
				title: e.target.value
			};
			this.props.addTodo(newTodo);
			e.target.value = "";
		}
	}
	render() {
		return(
			<header className="header">
				<h1>{this.props.todoName}</h1>
				<input className="new-todo" placeholder="what needs to be done" onKeyUp={this.addTodo.bind(this)} />
			</header>
		);
	}
}