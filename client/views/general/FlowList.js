
import React from 'react';

/**
 * Free flowing horizontal or vertical list
 */
const FlowList = ({horizontal, children}) =>
{
    if (horizontal) {
        return (
            <div>
                {children}
            </div>
        )
    }
    else {
        return (
            <span>
                {children}
            </span>
        )
    }
};

export default FlowList;
