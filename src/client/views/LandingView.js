
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';

import api from '../api';
import ev from '../events';
import paths from '../../paths';

import ConversationView from './presentation/landing/ConversationView';
import FlowList from './presentation/FlowList';


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

        // Bind functions because React
        this.newConversation = this.newConversation.bind(this);
        this.setConversation = this.setConversation.bind(this);
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
            return this.renderNotLoaded();
        }
        else {
            let conversationList = this.generateConversationList();

            return (
                <div id="landing-root">
                    {conversationList}

                    <button onClick={this.newConversation}>New Conversation</button>
                </div>
            );
        }
    }

    /**
     * Renders when the conversations have not yet been loaded
     * @returns {XML}
     */
    renderNotLoaded()
    {
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

    /**
     * Generates the conversation list based on the state of the conversations
     */
    generateConversationList()
    {
        if (this.props.conversations.length === 0) {
            return (
                <FlowList horizontal={true}>
                    No Conversations are loaded yet
                </FlowList>
            );
        }
        else {
            return (
                <FlowList horizontal={true}>
                    {this.props.conversations.map(p => <ConversationView name={p.name}
                                                                         key={p.name}
                                                                         onClick={this.setConversation}/>)}
                </FlowList>
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
        setActiveConversation : (name) => dispatch(events.setActiveConversation.create(name)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LandingView);