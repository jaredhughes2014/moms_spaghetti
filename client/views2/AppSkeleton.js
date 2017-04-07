

import React from 'react';

/**
 * Top level view used to organize the structure of the app
 */
const AppSkeleton = ({header, children}) =>
{
    return (
        <div id="app-root">
            <div id="app-header">{header}</div>
            <div id="app-content">{children}</div>
        </div>
    )
};

export default AppSkeleton;
