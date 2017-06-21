import React from "react";

export default class TodoFooter extends React.Component {
	showAll() {
		this.refs.all.className = "selected";
		this.refs.active.className = "";
		this.refs.completed.className = "";
		this.props.changeStat("all");
	}
	showCompleted() {
		this.refs.all.className = "";
		this.refs.active.className = "";
		this.refs.completed.className = "selected";
		this.props.changeStat("completed");
	}
	showActive() {
		this.refs.all.className = "";
		this.refs.active.className = "selected";
		this.refs.completed.className = "";
		this.props.changeStat("active");
	}
	clearCompleted() {
		this.props.clearCompleted();
	}
	render() {
		const todos = this.props.todos;
		const lefted = todos.reduce((acc, todoItem) => todoItem.completed ? acc : acc+1, 0);
		return(
			<footer className="footer">
                <span className="todo-count">
                    <strong> {lefted} </strong> <span> </span> <span> items </span> <span> left </span>
                </span>
                <ul className="filters">
                    <li><a href="#/" className="selected" onClick={this.showAll.bind(this)} ref="all">All</a></li>
                    <li><a href="#/active" className="" onClick={this.showActive.bind(this)} ref="active">Active</a></li> 
                    <li><a href="#/completed" className="" onClick={this.showCompleted.bind(this)} ref="completed">Completed</a></li>
                </ul>
                <button className="clear-completed" onClick={this.clearCompleted.bind(this)}>
                    Clear completed
                </button>
            </footer>
		);
	}
}