
import React from 'react';

import TriggerView from './TriggerView';
import FlowList from '../FlowList';

/**
 * Renders the section of the page containing the conversation triggers
 */
const TriggerSection = ({triggers, onDelete}) =>
{
    if (triggers.length > 0) {
        return (
            <FlowList>
                {triggers.map(p => <TriggerView text={p} key={p} onClick={onDelete}/>)}
            </FlowList>
        );
    }
    else {
        return (
            <div className="conversation-edit-empty">
                No triggers added yet
            </div>
        );
    }
};

export default TriggerSection;
