
import React from 'react';

/**
 * Renders a node selector, which lets the user choose a conversation node to edit
 */
const NodeSelector = ({id, onClick}) =>
{
    // TODO just use the ID of the node as text
    return (
        <div className="node-selector" onClick={onClick}>
            {id}
        </div>
    );
};

export default NodeSelector;