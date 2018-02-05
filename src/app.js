// Packages Needed
import React from 'react';
import ReactDOM from 'react-dom';

// Custom Class
import IndecisionApp from './components/IndecisionApp';

// Css Class
import 'normalize.css/normalize.css';
import './styles/styles.scss';

// Templating from the Indecision App
ReactDOM.render(<IndecisionApp />, document.getElementById('app'));