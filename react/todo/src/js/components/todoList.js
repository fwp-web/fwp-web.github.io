import React from "react";
import TodoItem from "./todoItem";

export default class TodoList extends React.Component {
	toggleAll() {
		this.props.toggleAll();
	}
	toggle(todo) {
		this.props.toggle(todo);
	}
	destroyTodoitem(todo) {
		this.props.destroyTodoitem(todo);
	}
	render() {
		const todos = this.props.todos;
		const stat = this.props.stat;
		const todoList = todos.length
		? todos.map((todoItem, index) => {
			let classname = "";
			if(todoItem.completed) {
				classname = "completed";
			}
			if(stat === "all") {
				return <TodoItem key={index} classname={classname} todo={todoItem} itemTitle={todoItem.title} toggle={this.toggle.bind(this)} destroyTodoitem={this.destroyTodoitem.bind(this)}/>
			} else if(stat === "completed") {
				return classname === "completed" 
					? <TodoItem key={index} classname={classname} todo={todoItem} itemTitle={todoItem.title} toggle={this.toggle.bind(this)} destroyTodoitem={this.destroyTodoitem.bind(this)}/>
					: "";
			} else {
				return classname === "completed"
					? ""
					: <TodoItem key={index} classname={classname} todo={todoItem} itemTitle={todoItem.title} toggle={this.toggle.bind(this)} destroyTodoitem={this.destroyTodoitem.bind(this)}/>
			}
		})
		: <li>尚未添加代做事项</li>;

		return(
			<section className="main">
				<input className="toggle-all" type="checkbox" onClick={this.toggleAll.bind(this)} />
				<ul className="todo-list">
					{todoList}
				</ul>
			</section>
		);
	}
}