import React from 'react';
import {render} from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import paths from '../app/paths';
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import reducers from './state/reducers';


// Import Views Here
import AppSkeleton from './views/general/AppSkeleton';
import LandingPage from './views/landing/LandingPage';

const reducer = combineReducers(reducers);
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
                    <IndexRoute component={LandingPage}/>
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