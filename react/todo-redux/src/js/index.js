import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './containers/app';
import todoApp from './reducers/reducers';

let store = createStore(todoApp);
let rootElement = document.getElementById('AppRoot');

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>, 
	rootElement
);