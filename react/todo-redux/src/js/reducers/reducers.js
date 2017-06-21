import { combineReducers } from 'redux';
import { ADD_TODO, TOGGLE_TODO, COMPLETE_ALL, UNCOMPLETE_ALL, DESTROY_TODO, CLEAR_COMPLETED, SET_VISIBILITY_FILTER, VisibilityFilters } from '../actions/actions';

const { SHOW_ALL } = VisibilityFilters;
const defaultTodos = [
	{ 
		text: 'learn redux', 
		completed: false
	}, 
	{ 
		text: 'learn react', 
		completed: false
	}, 
	{
		text: 'learn js',
		completed: true

	}
];
function visibilityFilter(state = SHOW_ALL, action) {
	switch(action.type) {
		case SET_VISIBILITY_FILTER: 
			return action.filter;
		default: 
			return state;
	}
}

function todos(state=defaultTodos, action) {
	let newState = [];
	switch(action.type) {
		case ADD_TODO: 
			return [
				...state, 
				{
					text: action.text, 
					completed: false
				}
			];
		case TOGGLE_TODO: 
			return [
				...state.slice(0, action.index), 
				Object.assign({}, state[action.index], {
					completed: !state[action.index].completed
				}), 
				...state.slice(action.index + 1)
			];
		case COMPLETE_ALL: 
			newState = state.slice(0);
			newState.map(todo => 
				todo.completed = true
			);
			return newState;
		case UNCOMPLETE_ALL: 
			newState = state.slice(0);
			newState.map(todo => 
				todo.completed = false
			);
			return newState;
		case DESTROY_TODO: 
			return [
				...state.slice(0, action.index), 
				...state.slice(action.index+1)
			];
		case CLEAR_COMPLETED: 
			state.map(todo => {
				if(!todo.completed) {
					newState.push(todo);
				}
			});
			return newState;
		default: 
			return state; 
	}
}

const todoApp = combineReducers({
	visibilityFilter, 
	todos
});
export default todoApp;