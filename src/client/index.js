
// var ReactDOM = require('react-dom');
// var React = require('react');
// var Tree = require('./tree.js');
// var TreeData = require('./treeData.js');
// var Panel = require('react-bootstrap/lib/Panel');
//
//
// /**
//  * Let there be Tree
//  */
// ReactDOM.render(
//     <Panel header={<h3>Customize your Tree</h3>} bsStyle="primary"><Tree node={TreeData.tree}/></Panel>,
//     document.getElementById('app')
// );

import React from 'react';
import {render} from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import paths from '../paths';
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';

import reducers from './reducers';

// Import Views Here
import AppSkeleton from './views/presentation/AppSkeleton';
import LandingView from './views/LandingView';
import EditConversationView from './views/EditConversationView';

let reducer = combineReducers(reducers);
let store = createStore(reducer);


/**
 * Routes all the things
 */
const MomsSpaghettiRouter = () =>
{
    return (
        <Provider store={store}>
            <Router history={browserHistory}>
                <Route path={paths.index} component={AppSkeleton}>
                    /* Home Page */
                    <IndexRoute component={LandingView}/>

                    /* Edit Conversation Page */
                    <Route path={paths.conversations.edit} component={EditConversationView}/>
                </Route>
            </Router>
        </Provider>
    );
};

/**
 * Render that shiz
 */
render(
    <MomsSpaghettiRouter/>,
    document.getElementById('root')
);