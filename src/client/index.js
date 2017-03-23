
import React from 'react';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import {render} from 'react-dom';

//Import views here
import AppSkeleton from './views/presentation/AppSkeleton';
import Tree from './tree';

const MomsSpaghettiRouter = () =>
{
    return (
        <Router history={browserHistory}>
            <Route path="/" component={AppSkeleton} title="Title">
                <IndexRoute component={Tree}/>
            </Route>
        </Router>
    );
};

render(
    <MomsSpaghettiRouter/>,
    document.getElementById('root')
);