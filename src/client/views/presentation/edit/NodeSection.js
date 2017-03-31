
import React from 'react';

import NodeSelector from './NodeSelector';
import FlowList from '../FlowList';

/**
 * Renders the section of the page containing the conversation nodes
 */
const NodeSection = ({nodes, onClick}) =>
{
    console.log(nodes);
    if (nodes.length > 0) {
        return (
            <FlowList>
                {nodes.map(p => <NodeSelector id={p.id} key={p.id} onClick={onClick}/>)}
            </FlowList>
        );
    }
    else {
        return (
            <div className="conversation-edit-empty">
                No nodes added yet
            </div>
        );
    }
};

export default NodeSection;
