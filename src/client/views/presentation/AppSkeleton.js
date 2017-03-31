

import React, {Component} from 'react';

/**
 *
 */
const AppSkeleton  = ({title, children}) => {
    return (
        <div id="app-skeleton">
            <div id="top-bar">
                <p>{title}</p>
            </div>

            <div id="content-pane">
                {children}
            </div>
        </div>
    );
};

export default AppSkeleton;