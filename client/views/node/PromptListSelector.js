
import React from 'react';

import Button from 'react-bootstrap/lib/Button';

/**
 *
 */
const PromptListSelector = ({name, onDelete, onEdit}) =>
{
    return (
        <div>
            <span>{name}</span>
            <span>
                <Button onClick={() => onDelete(name)}>Delete</Button>
            </span>
            <span>
                <Button onClick={() => onEdit(name)}>Edit</Button>
            </span>
        </div>
    );
};

export default PromptListSelector;