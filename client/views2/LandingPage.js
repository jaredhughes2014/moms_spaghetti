

import React from 'react';
import {connect} from 'react-redux';

import events from '../events';

import ConversationSelector from './landing/ConversationSelector';

/**
 *
 */
class LandingPage extends React.Component
{
    /**
     * Expected props:
     */
    constructor(props)
    {
        super(props);
    }

    /**
     * Renders this view
     */
    render()
    {
        return (
            <div>
                NYI
            </div>
        );
    }
}

/**
 * Connects the redux state to the view
 */
const mapStateToProps = (state) =>
{
    return {

    };
};

/**
 * Connects the redux event dispatcher to the view
 */
const mapDispatchToProps = (dispatch) =>
{
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);


