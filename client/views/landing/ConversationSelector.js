
import React from 'react';
import Button from 'react-bootstrap/lib/Button';


/**
 *
 */
const ConversationSelector = ({name, onClick}) =>
{
    return (
        <Button onClick={() => onClick(name)} className="conversation-selector">
            <div className="conversation-selector-label">
                {name}
            </div>
        </Button>
    );
};

export default ConversationSelector;