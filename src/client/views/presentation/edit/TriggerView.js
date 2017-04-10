
import React from 'react';

/**
 * Renders the view for a conversation text trigger. This is the text that will lead the user
 * into the conversation tree
 */
const TriggerView = ({text, onClick}) =>
{
    return (
        <div className="conversation-trigger">
            <div>{text}</div>
            <button onClick={() => onClick(text)}>Delete</button>
        </div>
    );
};

export default TriggerView;