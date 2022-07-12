import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import {applyMiddleware, compose, createStore} from 'redux';
import thunk from 'redux-thunk';

import reducers from './reducers';
import App from './App';

import './index.scss';

const store = createStore(reducers, compose(applyMiddleware(thunk)));
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>            
        <App />
    </Provider>
);