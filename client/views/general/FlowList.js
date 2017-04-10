
import React from 'react';

/**
 * Free flowing horizontal or vertical list
 */
const FlowList = ({horizontal, children}) =>
{
    return (
        <div className={horizontal ? "flow-list-horizontal" : "flow-list-vertical"}>
            {children}
        </div>
    )
};

export default FlowList;
