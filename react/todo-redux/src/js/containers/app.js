import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { addTodo, toggleTodo, completeAll, uncompleteAll, destroyTodo, setVisibilityFilter, clearCompleted, VisibilityFilters } from '../actions/actions'
import TodoHeader from '../components/todoHeader';
import TodoFooter from '../components/todoFooter';
import TodoList from '../components/todoList';

class App extends React.Component {
	
	render() {
		const {dispatch, visibleTodos, activeTodos, visibilityFilter} = this.props;
		return(
			<div>
				<TodoHeader onAddTodo={text=>dispatch(addTodo(text))} />
				<TodoList todos={visibleTodos} onTodoClick={index=>dispatch(toggleTodo(index))} completeAll={() => dispatch(completeAll())} uncompleteAll={() => dispatch(uncompleteAll())} destroyTodo={index => dispatch(destroyTodo(index))} />
				<TodoFooter todos={activeTodos} filter={visibilityFilter} onFilterChange={nextFilter=>dispatch(setVisibilityFilter(nextFilter))} clearCompleted={() => dispatch(clearCompleted())} />
			</div>
		);
	}
}

App.propTypes = {
	visibleTodos: PropTypes.arrayOf(PropTypes.shape({
    	text: PropTypes.string.isRequired,
    	completed: PropTypes.bool.isRequired
  	}).isRequired).isRequired,
  	activeTodos: PropTypes.arrayOf(PropTypes.shape({
    	text: PropTypes.string.isRequired,
    	completed: PropTypes.bool.isRequired
  	}).isRequired).isRequired,
  	visibilityFilter: PropTypes.oneOf([
    	'SHOW_ALL',
    	'SHOW_COMPLETED',
    	'SHOW_ACTIVE'
  ]).isRequired
};

function selectTodos(todos, filter) {
	switch(filter) {
		case VisibilityFilters.SHOW_ALL:
			return todos;
		case VisibilityFilters.SHOW_COMPLETED: 
			return todos.filter(todo => todo.completed);
		case VisibilityFilters.SHOW_ACTIVE: 
			return todos.filter(todo => !todo.completed);
	}
}
function select(state) {
	return {
		visibleTodos: selectTodos(state.todos, state.visibilityFilter), 
		activeTodos: selectTodos(state.todos, 'SHOW_ACTIVE'), 
		visibilityFilter: state.visibilityFilter
	}
}
export default connect(select)(App);