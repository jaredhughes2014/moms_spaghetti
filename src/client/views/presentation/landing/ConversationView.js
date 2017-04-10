
import React from 'react';

/**
 * Box for an individual conversation on the landing page. This is where the user
 * selects which conversation they want to edit
 */
const ConversationView = ({name, onClick}) =>
{
    return (
        <div className="landing-conversation" onClick={(source) => onClick(name)}>
            <div className="landing-conversation-label">
                {name}
            </div>
        </div>
    );
};

export default ConversationView;