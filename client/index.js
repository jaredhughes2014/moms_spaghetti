import React from 'react';
import {render} from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import routes from './routes';

// Import Views Here
import MomsSpaghettiProvider from './MomsSpaghettiProvider';
import AppSkeleton from './views/AppSkeleton';

import LandingPage from './views/LandingPage';
import ConversationEditView from './views/ConversationEditView';
import NodeEditView from './views/NodeEditView';


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
                    <Route path={routes.conversation} component={ConversationEditView}/>
                    <Route path={routes.node} component={NodeEditView}/>
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