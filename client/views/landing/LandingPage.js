
import React, {Component} from 'react';
import {connect} from 'react-redux';

import api from '../../api';
import ev from '../../state/events';

import ConversationBox from './ConversationBox';
import FlowList from '../general/FlowList';
import LowerBar from './LowerBar';
import NewConversationModal from './NewConversationModal';


const events = ev.conversations;

/**
 * Page where the landing be do
 */
class LandingPage extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            newOpen: false,
            loaded: false,
        };
        this.selectConversation = this.selectConversation.bind(this);
        this.toggleNewModal = this.toggleNewModal.bind(this);
    }

    render()
    {
        if (this.state.loaded) {
            return this.state.newOpen ? this.renderModal() : this.renderNoModal();
        }
        else {
            api.getConversations((response) => {
                this.props.setConversations(response.conversations);
                this.setState({loaded: true});
            });
            return this.renderNotLoaded();
        }
    }

    /**
     * Renders this view if the conversations have not been loaded yet
     * @returns {XML}
     */
    renderNotLoaded()
    {
        return (
            <div id="landing-page">
                Loading...
            </div>
        );
    }

    /**
     * Renders this view without a modal box
     */
    renderNoModal()
    {
        return (
            <div id="landing-page">
                <FlowList horizontal={true}>
                    {this.props.conversations.map(p => <ConversationBox name={p} key={p} onClick={this.selectConversation}/>)}
                </FlowList>

                <LowerBar onNew={this.toggleNewModal}/>
            </div>
        );
    }

    /**
     * Renders this view with a modal box
     */
    renderModal()
    {
        return (
            <div id="landing-page">
                <NewConversationModal onClose={this.toggleNewModal}/>
            </div>
        );
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
    toggleNewModal()
    {
        this.setState({newOpen: !this.state.newOpen})
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
        setConversations: (conversations) => dispatch(events.setConversations.create(conversations)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);