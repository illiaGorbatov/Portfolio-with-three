import React, {StrictMode} from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import App from './App';
import {Provider} from "react-redux";
import store from './store/store';

ReactDOM.render(
    <StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>
    </StrictMode>,
    document.getElementById('root')
);

