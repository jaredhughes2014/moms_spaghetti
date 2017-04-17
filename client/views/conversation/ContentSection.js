
import React from 'react';

import FlowList from '../general/FlowList'

/**
 *
 */
const ContentSection = ({children, buttonText, onClick}) =>
{
    return (
        <div>
            <button onClick={onClick}>{buttonText}</button>
            <FlowList horizontal={false}>
                {children}
            </FlowList>
        </div>
    );
};

export default ContentSection;