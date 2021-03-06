/**
 *
 * app.js
 *
 * This is the entry file for the application, mostly just setup and boilerplate
 * code. Routes are configured at the end of this file!
 *
 */

// Load the ServiceWorker, the Cache polyfill, the manifest.json file and the .htaccess file

import 'file?name=[name].[ext]!../serviceworker.js';
import 'file?name=[name].[ext]!../manifest.json';
import 'file?name=[name].[ext]!../.htaccess';
import 'jquery/src/jquery.js';
// require ('jquery/dist/jquery.min.js');
import './bootstrap.js';
$.fn.serializeObject = function () {
    const o = {};
    const a = this.serializeArray();
    $.each(a, function () {
        if (o[this.name]) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};
// // Check for ServiceWorker support before trying to install it
// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker.register('/serviceworker.js').then(() => {
//     // Registration was successful
//   }).catch(() => {
//     // Registration failed
//   });
// } else {
//   // No ServiceWorker Support
// }

// Import all the third party stuff
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, useRouterHistory } from 'react-router';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import FontFaceObserver from 'fontfaceobserver';
import createHistory from 'history/lib/createBrowserHistory';
const browserHistory = createHistory();

import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux';

// Observer loading of Open Sans (to remove open sans, remove the <link> tag in the index.html file and this observer)
const openSansObserver = new FontFaceObserver('Open Sans', {});

// When Open Sans is loaded, add the js-open-sans-loaded class to the body
openSansObserver.check().then(() => {
    document.body.classList.add('js-open-sans-loaded');
}, () => {
    document.body.classList.remove('js-open-sans-loaded');
});

// Import the pages
import HomePage from './components/pages/HomePage.react';
import ReadmePage from './components/pages/ReadmePage.react';
import NotFoundPage from './components/pages/NotFound.react';
import PrintPage from './components/pages/Print.react.js';
import ImportPage from './components/pages/ImportPage.react';
import App from './components/App.react';

// Import the CSS file, which HtmlWebpackPlugin transfers to the build folder
import '../css/main.css';

// Create the store with the redux-thunk middleware, which allows us
// to do asynchronous things in the actions
import rootReducer from './reducers/rootReducer';

// @Deprecated: use compose to assemble middlewares
// const createStoreWithMiddleware = applyMiddleware(
//   thunk,
//   routerMiddleware(browserHistory)
// )(createStore);

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    applyMiddleware(routerMiddleware(browserHistory)),
    window.devToolsExtension ? window.devToolsExtension() : f => f
    )
);

// Make reducers hot reloadable, see http://stackoverflow.com/questions/34243684/make-redux-reducers-and-other-non-components-hot-loadable
if (module.hot) {
    module.hot.accept('./reducers/rootReducer', () => {
        const nextRootReducer = require('./reducers/rootReducer').default;
        store.replaceReducer(nextRootReducer);
    });
}

// useRouterHistory accomodate react-router 2.x
const history = useRouterHistory(() => syncHistoryWithStore(browserHistory, store))();

// Mostly boilerplate, except for the Routes. These are the pages you can go to,
// which are all wrapped in the App component, which contains the navigation etc
ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Route path="/print" component={PrintPage} />
            <Route component={App}>
                <Route path="/" component={HomePage} />
                <Route path="/readme" component={ReadmePage} />
                <Route path="/import" component={ImportPage} />
                <Route path="*" component={NotFoundPage} />
            </Route>
        </Router>
    </Provider>,
    document.getElementById('app')
);
