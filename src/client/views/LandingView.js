
import React, {Component} from 'react';
import {connect} from 'react-redux';

import api from '../api';
import ev from '../events';

const events = ev.conversation;

/**
 * Renders the home page allowing users to choose their conversations
 */
class LandingView extends React.Component
{
    constructor()
    {
        super();
    }

    /**
     * Executed to create a new conversation
     */
    newConversation()
    {
        api.addConversation("New Conversation", (conversation) => {
            this.props.addConversation(conversation);
        });
    }

    /**
     * Renders the HTML for this view
     */
    render()
    {
        if (this.props.conversations && this.props.conversations.length > 0) {
            return (
                <div id="landing-root">
                    {this.props.conversations.map(p => <div key={p.name}>{p.name}</div>)}
                    <button onClick={this.newConversation.bind(this)}>New</button>
                </div>
            )
        }
        else {

            if (!this.props.conversations) {
                api.getConversations((conversations) => {
                    this.props.setConversations(conversations);
                });
            }

            return (
                <div id="landing-root">
                    <div className="conversation-warning">
                        No conversations. Click "New" to start a new conversation
                    </div>
                    <button onClick={this.newConversation.bind(this)}>New</button>
                </div>
            );
        }
    }
}


/**
 * Maps the redux state to the view's properties
 */
const mapStateToProps = (state) =>
{
    return {
        conversations: state.conversation.conversations
    }
};

/**
 * Maps the redux dispatcher to the view's properties
 */
const mapDispatchToProps = (dispatch) =>
{
    return {
        setConversations : (c) => dispatch(events.setConversations.create(c)),
        addConversation : (c) => dispatch(events.addConversation.create(c)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LandingView);