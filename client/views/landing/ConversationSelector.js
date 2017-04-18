
import React from 'react';

/**
 *
 */
const ConversationSelector = ({name, onClick}) =>
{
    return (
        <button onClick={() => onClick(name)}>
            {name}
        </button>
    );
};

export default ConversationSelector;