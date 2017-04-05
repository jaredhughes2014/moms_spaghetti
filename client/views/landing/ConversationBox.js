import React from 'react';

/**
 * Box rendering a conversation chooser in the landing page
 */
const ConversationBox = ({name, onClick}) =>
{
    return (
        <div className="landing-conversation-box" onClick={onClick}>
            <div className="label">
                {name}
            </div>
        </div>
    );
};

export default ConversationBox;