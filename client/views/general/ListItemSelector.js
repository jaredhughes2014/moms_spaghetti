
import React from 'react';

import Button from 'react-bootstrap/lib/Button';

/**
 *
 */
const ListItemSelector = ({name, onDelete}) =>
{
    return (
        <div className="list-item">
            <span>{name}</span>
            <Button className="delete-button" onClick={() => onDelete(name)}>Delete</Button>
        </div>
    );
};

export default ListItemSelector;