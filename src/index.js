import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import 'semantic-ui-css/semantic.min.css';
import GraphingCalculator from './components/CalculatorContainer';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<GraphingCalculator />, document.getElementById('root'));
registerServiceWorker();
