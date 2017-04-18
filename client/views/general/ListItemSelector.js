
import React from 'react';

import Button from 'react-bootstrap/lib/Button';

/**
 *
 */
const ListItemSelector = ({name, onDelete}) =>
{
    return (
        <div>
            <span>{name}</span>
            <Button onClick={() => onDelete(name)}>Delete</Button>
        </div>
    );
};

export default ListItemSelector;