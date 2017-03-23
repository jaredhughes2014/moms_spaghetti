
import React from 'react';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import {render} from 'react-dom';

import Tree from './tree';

const MomsSpaghettiRouter = () =>
{
    return (
        <Router history={browserHistory}>
            <Route path="/">
                <IndexRoute component={Tree}/>
            </Route>
        </Router>
    );
};

render(
    <MomsSpaghettiRouter/>,
    document.getElementById('root')
);