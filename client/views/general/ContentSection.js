
import React from 'react';

import FlowList from './FlowList'
import Button from 'react-bootstrap/lib/button';

/**
 *
 */
const ContentSection = ({children, buttonText, onClick}) =>
{
    return (
        <div>
            <Button onClick={onClick}>{buttonText}</Button>
            <FlowList horizontal={false}>
                {children}
            </FlowList>
        </div>
    );
};

export default ContentSection;