
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';

import paths from '../../paths';
import ev from '../events';

let events = ev.conversation;

/**
 * View used to edit a conversation
 */
class EditConversationView extends React.Component
{
    constructor(props)
    {
        super(props);
    }

    render()
    {
        return (
            <div id="edit-root">
                You're editing now
            </div>
        );
    }
}

/**
 * Maps the Redux state to the conversation window
 */
const mapStateToProps = (state) =>
{
    return {
        conversation: state.conversation.conversations.find(p => p.name === state.conversation.active)
    };
};

/**
 * Maps the redux event dispatcher to the conversation window
 */
const mapDispatchToProps = (dispatch) =>
{
    return {
        goBack : () => dispatch(events.setActiveConversation.create(null))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditConversationView);
