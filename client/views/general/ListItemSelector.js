
import React from 'react';

/**
 *
 */
const ListItemSelector = ({name, onDelete}) =>
{
    return (
        <div>
            <span>{name}</span>
            <button onClick={onDelete}>Delete</button>
        </div>
    );
};

export default ListItemSelector;