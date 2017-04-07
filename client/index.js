import React from 'react';
import {render} from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import routes from './routes';

// Import Views Here
import MomsSpaghettiProvider from './MomsSpaghettiProvider';
import AppSkeleton from './views2/AppSkeleton';

import LandingPage from './views2/LandingPage';
import ConversationEditView from './views2/ConversationEditView';


/**
 * Routes all the things
 */
const MomsSpaghettiRouter = () =>
{
    return (
        <MomsSpaghettiProvider>
            <Router history={browserHistory}>
                <Route path={routes.index} component={AppSkeleton}>
                    <IndexRoute component={LandingPage}/>
                    <Route component={ConversationEditView}/>
                </Route>
            </Router>
        </MomsSpaghettiProvider>
    );
};

/**
 * Render that shiz
 */
render(
    <MomsSpaghettiRouter/>,
    document.getElementById('root')
);