
import React from 'react';

/**
 * Free flowing horizontal or vertical list
 */
const FlowList = ({horizontal, children}) =>
{
    const className = horizontal ? 'flow-list-horizontal': 'flow-list-vertical';

    return (
        <div className={className}>
            {children}
        </div>
    );
};

export default FlowList;
