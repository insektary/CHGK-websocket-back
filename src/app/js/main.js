import React from 'react';
import ReactDOM from 'react-dom';
import {MainPage} from './components/Main-Page';

window.onload = function(){
    ReactDOM.render(<MainPage />, document.getElementById('app'));
}
