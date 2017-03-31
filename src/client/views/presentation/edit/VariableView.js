
import React from 'react';

/**
 * Renders the view for a conversation variable. A variable is data collected about the user
 * from conversation which can effect the flow of the conversation
 */
const VariableView = ({name, onClick}) =>
{
    return (
        <div className="conversation-variable">
            <div>{name}</div>
            <button onClick={() => onClick(name)}>Delete</button>
        </div>
    );
};

export default VariableView;