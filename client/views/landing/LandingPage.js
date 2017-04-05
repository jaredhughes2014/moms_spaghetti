

import React, {Component} from 'react';
import {connect} from 'react-redux';

import ConversationBox from './ConversationBox';
import FlowList from '../general/FlowList';
import LowerBar from './LowerBar';


/**
 * Page where the landing be do
 */
class LandingPage extends React.Component
{
    constructor(props)
    {
        super(props);

        this.selectConversation = this.selectConversation.bind(this);
        this.openNewConversationModal = this.openNewConversationModal.bind(this);
    }

    render()
    {
        return (
            <div id="landing-page">
                <FlowList horizontal={true}>
                    {this.props.conversations.map(p => <ConversationBox name={p} key={p} onClick={this.selectConversation}/>)}
                </FlowList>

                <LowerBar onNew={this.openNewConversationModal}/>
            </div>
        )
    }

    /**
     * Selects the conversation to edit
     */
    selectConversation(name)
    {
        console.log(`Selected ${name}`);
    }

    /**
     * Opens a modal box for the user to create a new conversation
     */
    openNewConversationModal()
    {
        console.log(`Opening new conversation box`);
    }
}

/**
 * Maps the redux state to the properties of the landing page
 */
const mapStateToProps = (state) =>
{
    return {
        conversations: state.conversations.conversations
    };
};

/**
 * Maps the redux dispatch function to the properties of the landing page
 */
const mapDispatchToProps = (dispatch) =>
{
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);