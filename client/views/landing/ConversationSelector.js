
import React from 'react';
import Button from 'react-bootstrap/lib/Button';


/**
 *
 */
const ConversationSelector = ({name, onClick}) =>
{
    return (
        <Button onClick={() => onClick(name)}>
            {name}
        </Button>
    );
};

export default ConversationSelector;