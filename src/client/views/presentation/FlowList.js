
import React from 'react';

/**
 * Contains a flowing list of elements. This will either flow horizontally or
 * vertically, depending on the value of horizontal. Defaults to horizontal
 */
const FlowList = ({horizontal=true, children}) =>
{
    if (horizontal) {
        return (
            <div className="flow-list-horizontal">
                {children}
            </div>
        )
    }
    else {
        return (
            <div className="flow-list-vertical">
                {children}
            </div>
        )
    }
};

export default FlowList;
