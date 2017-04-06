

import React from 'react';

/**
 * View designed to display a node and allow the user to click on a node to select it
 */
const NodeSelector = ({name, onClick}) =>
{
    return (
        <div className="conversation-node-selector" onClick={() => onClick(name)}>
            {name}
        </div>
    );
};

export default NodeSelector;