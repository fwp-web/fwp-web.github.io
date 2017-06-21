import React from "react";
import { PropTypes } from 'prop-types';

export default class TodoItem extends React.Component {
	render() {
		let classname = this.props.completed ? 'completed' : '';
		return(
			<li className={classname}>
				<div className="view">
					<input className="toggle" type="checkbox" checked="" onClick={this.props.onTodoClick}/>
					<label>{this.props.text}</label>
					<button className="destroy" onClick={this.props.destroyTodo}></button>
				</div>
				<input type="text" className="edit" value={this.props.text} />
			</li>
		);
	}
}

TodoItem.propTypes = {
	onTodoClick: PropTypes.func.isRequired,
	destroyTodo: PropTypes.func.isRequired, 
  	text: PropTypes.string.isRequired,
  	completed: PropTypes.bool.isRequired
};