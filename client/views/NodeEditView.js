

import React from 'react';
import {connect} from 'react-redux';

import events from '../events';

import ContentSection from './node/ContentSection';
import KeyWordSelector from './node/KeyWordSelector';
import PromptSelector from './node/PromptSelector';
import TargetSelector from './node/TargetSelector';

/**
 *
 */
class NodeEditView extends React.Component
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

export default connect(mapStateToProps, mapDispatchToProps)(NodeEditView);


