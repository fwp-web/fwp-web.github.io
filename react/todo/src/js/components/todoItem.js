import React from "react";

export default class TodoItem extends React.Component {
	toggle() {
		this.props.toggle(this.props.todo);
	}
	destroyTodoitem() {
		this.props.destroyTodoitem(this.props.todo);
	}
	render() {
		return(
			<li className={this.props.classname}>
				<div className="view">
					<input className="toggle" type="checkbox" checked="" onClick={this.toggle.bind(this)}/>
					<label>{this.props.itemTitle}</label>
					<button className="destroy" onClick={this.destroyTodoitem.bind(this)}></button>
				</div>
				<input type="text" className="edit" value={this.props.itemTitle} />
			</li>
		);
	}
}