

import React from 'react';
import {Link} from 'react-router';

import routes from '../routes';

/**
 * Top level view used to organize the structure of the app
 */
const AppSkeleton = ({children}) =>
{
    return (
        <div id="app-root">
            <div id="app-header">
                <div id="app-title">
                    <Link to={routes.index}>
                        <img src="./img/icon.png" id="app-title-image"/>
                    </Link>

                    Mom's Spaghetti
                </div>
                <Link to={routes.index}>Home</Link>
            </div>

            <div id="app-content">{children}</div>
        </div>
    )
};

export default AppSkeleton;
