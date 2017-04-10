
import React from 'react';

/**
 * Renders the view for a conversation variable. A variable is data collected about the user
 * from conversation which can effect the flow of the conversation
 */
const VariableView = ({text, onClick}) =>
{
    return (
        <div className="conversation-variable">
            <div>{text}</div>
            <button onClick={() => onClick(text)}>Delete</button>
        </div>
    );
};

export default VariableView;