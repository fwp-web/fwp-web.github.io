import React from "react";
import { PropTypes } from 'prop-types';
import TodoItem from "./todoItem";

export default class TodoList extends React.Component {
	constructor() {
		super();
		this.state = {
			isToggleAll: false
		};
	}

	onToggleAll() {
		let isToggleAll = this.state.isToggleAll;
		if(!isToggleAll) {
			this.props.completeAll();
		} else {
			this.props.uncompleteAll();
		}
		this.setState({isToggleAll: !isToggleAll});
	}

	render() {
		let { todos } = this.props;

		const todoList = todos.length
		? todos.map((todo, index) => {
			return (
				<TodoItem {...todo} key={index} onTodoClick={() => this.props.onTodoClick(index)} destroyTodo={() => this.props.destroyTodo(index)} />
			)
		})
		: <li><p className="notodo">无事项</p></li>;

		return(
			<section className="main">
				<input className="toggle-all" type="checkbox" onClick={this.onToggleAll.bind(this)} />
				<ul className="todo-list">
					{todoList}
				</ul>
			</section>
		);
	}
}

TodoList.propTypes = {
  onTodoClick: PropTypes.func.isRequired,
  completeAll: PropTypes.func.isRequired, 
  uncompleteAll: PropTypes.func.isRequired, 
  todos: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired
  }).isRequired).isRequired
}