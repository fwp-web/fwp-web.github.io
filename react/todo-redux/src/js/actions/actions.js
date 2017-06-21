/*
 * action 类型
 */

export const ADD_TODO = 'ADD_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO';
export const COMPLETE_ALL = 'COMPLETE_ALL';
export const UNCOMPLETE_ALL = 'UNCOMPLETE_ALL';
export const DESTROY_TODO = 'DESTROY_TODO';
export const CLEAR_COMPLETED = 'CLEAR_COMPLETED';
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER'

/*
 * 其它的常量
 */

export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
};

/*
 * action 创建函数
 */

export function addTodo(text) {
    return { type: ADD_TODO, text };
}

export function toggleTodo(index) {
    return { type: TOGGLE_TODO, index };
}

export function completeAll() {
    return { type: COMPLETE_ALL };
}

export function uncompleteAll() {
	return { type: UNCOMPLETE_ALL };
}

export function destroyTodo(index) {
	return { type: DESTROY_TODO, index };
}

export function clearCompleted() {
	return { type: CLEAR_COMPLETED };
}

export function setVisibilityFilter(filter) {
  return { type: SET_VISIBILITY_FILTER, filter };
}