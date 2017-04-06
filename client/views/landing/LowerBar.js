

import React from 'react';

/**
 * Renders the lower bar of the landing page.
 */
const LowerBar = ({onNew}) =>
{
    return (
        <div id="landing-lower-bar">
            <button onClick={onNew}>New</button>
        </div>
    );
};

export default LowerBar;