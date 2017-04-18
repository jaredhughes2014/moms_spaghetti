
import React from 'react';
import Panel from 'react-bootstrap/lib/Panel';

import FlowList from './FlowList'
import Button from 'react-bootstrap/lib/Button';

/**
 *
 */
const ContentSection = ({children, buttonText, onClick}) =>
{
    return (
        <Panel>
            <Button onClick={onClick}>{buttonText}</Button>
            <FlowList horizontal={false}>
                {children}
            </FlowList>
        </Panel>
    );
};

export default ContentSection;