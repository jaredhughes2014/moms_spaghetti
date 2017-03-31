
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';

import api from '../api';
import ev from '../events';
import paths from '../../paths';

import ConversationView from './presentation/landing/ConversationView';


const events = ev.conversation;

/**
 * Renders the home page allowing users to choose their conversations
 */
class LandingView extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {loaded: false};
    }

    /**
     * Executed to create a new conversation
     */
    newConversation()
    {
        api.addConversation("New Conversation " + (this.props.conversations.length + 1), (conversation) => {
            this.props.addConversation(conversation);
        });
    }

    /**
     * Sets the conversation that should currently be edited.
     * @param name
     */
    setConversation(name)
    {
        this.props.setActiveConversation(name);
        browserHistory.push(paths.conversations.edit);
    }

    /**
     * Renders the HTML for this view
     */
    render()
    {
        if (!this.state.loaded) {
            api.getConversations((response) => {
                this.setState({loaded: true});
                this.props.setConversations(response);
            });

            return (
                <div id="landing-loading-notification">
                    Loading, please wait...
                </div>
            );
        }
        else return (
            <div id="landing-page">
                {this.props.conversations.map(p => <ConversationView name={p.name}
                                                                    key={p.name}
                                                                    onClick={this.setConversation.bind(this)}/>)}

                <button onClick={this.newConversation.bind(this)}>New Conversation</button>
            </div>
        );
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
        setActiveConversation : (name) => dispatch(events.setActiveConversation.create(name)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LandingView);