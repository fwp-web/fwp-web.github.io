import React from "react";
import ReactDOM from "react-dom";
import {Router, Route, hashHistory} from 'react-router';
import TodoHeader from "./components/todoHeader";
import TodoFooter from "./components/todoFooter";
import TodoList from "./components/todoList";

export default class Index extends React.Component {
	constructor() {
		super();
		this.state = {
			todoName: "Todos", 
			todos: [{
				completed: false, 
				title: "finish exercise"
			}, {
				completed: false, 
				title: "learn jsx"
			}, {
				completed: true, 
				title: "learn react"
			}], 
			stat: "all", 
			toggleAll: false
		};
	}
	addTodo(newTodo) {
		let todolists = this.state.todos;
		todolists.push(newTodo);
		this.setState({todos: todolists});
	}
	toggleAll() {
		let todolists = this.state.todos;
		let isToggleAll = this.state.toggleAll;
		console.log(isToggleAll);
		todolists.map(todo => {
			if(!isToggleAll) {
				todo.completed = true;
			} else {
				todo.completed = false;
			}
		});
		this.setState({todos: todolists, toggleAll: !isToggleAll});
	}
	toggle(todo) {
		let todolists = this.state.todos;
		todolists.map(todoItem => {
			if(todo == todoItem) {
				if(todoItem.completed) {
					todoItem.completed = false;
				} else {
					todoItem.completed = true;
				}
			}
		});
		this.setState({todos: todolists});
	}
	destroyTodoitem(todo) {
		let todolists = this.state.todos;
		todolists.map((todoItem, index) => {
			if(todo == todoItem) {
				delete todolists[index];
			}
		});
		this.setState({todos: todolists});
	}
	changeStat(stat) {
		let nowStat = this.state.stat;
		if(stat === nowStat) {
			return;
		}
		nowStat = stat;
		this.setState({stat: nowStat});
	}
	clearCompleted() {
		let todolists = this.state.todos;
		todolists.map((todo, index) => {
			if(todo.completed) {
				delete todolists[index];
			}
		});
		this.setState({todos: todolists});
	}

	render() {
		return(
			<div>
				<TodoHeader todoName={this.state.todoName} addTodo={this.addTodo.bind(this)} />
				<TodoList todos={this.state.todos} stat={this.state.stat} toggleAll={this.toggleAll.bind(this)} toggle={this.toggle.bind(this)} destroyTodoitem={this.destroyTodoitem.bind(this)}/>
				<TodoFooter todos={this.state.todos} changeStat={this.changeStat.bind(this)} clearCompleted={this.clearCompleted.bind(this)}/>
			</div>
		);
	}
}

ReactDOM.render(<Index />, document.getElementById("AppRoot"));