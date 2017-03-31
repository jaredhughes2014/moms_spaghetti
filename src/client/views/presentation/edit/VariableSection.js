
import React from 'react';

import VariableView from './VariableView';
import FlowList from '../FlowList';

/**
 * Renders the section of the page containing the conversation variables
 */
const VariableSection = ({variables, onDelete}) =>
{
    if (variables.length > 0) {
        return (
            <FlowList>
                {variables.map(p => <VariableView name={p.name} key={p.name} onClick={onDelete}/>)}
            </FlowList>
        );
    }
    else {
        return (
            <div className="conversation-edit-empty">
                No variables added yet
            </div>
        );
    }
};

export default VariableSection;
