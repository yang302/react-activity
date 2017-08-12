import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {
	AppContainer
} from 'react-hot-loader';

import 'static/js/flexible_css.debug';
import 'static/js/flexible.debug';

//解决移动端300毫秒延迟
var FastClick = require('fastclick');
FastClick.attach(document.body);

import 'static/css/base.scss';

const render = Component => {
	ReactDOM.render(
		<AppContainer>
        <Component/>
    </AppContainer>, document.getElementById('root'))
}

render(App);

if (module.hot) {
	module
		.hot
		.accept('./App', () => render(App));
}