import React from "react";
import { PropTypes } from 'prop-types';

export default class TodoFooter extends React.Component {
	showAll() {
		if(this.props.filter === 'SHOW_ALL') {
			return;
		}
		this.refs.all.className = 'selected';
		this.refs.active.className = '';
		this.refs.completed.className = '';
		this.props.onFilterChange('SHOW_ALL');
	}
	showCompleted() {
		if(this.props.filter === 'SHOW_COMPLETED') {
			return;
		}
		this.refs.all.className = "";
		this.refs.active.className = "";
		this.refs.completed.className = "selected";
		this.props.onFilterChange('SHOW_COMPLETED');
	}
	showActive() {
		if(this.props.filter === 'SSHOW_ACTIVE') {
			return;
		}
		this.refs.all.className = "";
		this.refs.active.className = "selected";
		this.refs.completed.className = "";
		this.props.onFilterChange('SHOW_ACTIVE');
	}
	
	render() {
		const lefted = this.props.todos.length;
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
                <button className="clear-completed" onClick={this.props.clearCompleted}>
                    Clear completed
                </button>
            </footer>
		);
	}
}

TodoFooter.propTypes = {
	todos: PropTypes.arrayOf(PropTypes.shape({
    	text: PropTypes.string.isRequired,
    	completed: PropTypes.bool.isRequired
  	}).isRequired).isRequired,
	onFilterChange: PropTypes.func.isRequired,
	clearCompleted: PropTypes.func.isRequired, 
  	filter: PropTypes.oneOf([
    	'SHOW_ALL',
    	'SHOW_COMPLETED',
    	'SHOW_ACTIVE'
  	]).isRequired
};