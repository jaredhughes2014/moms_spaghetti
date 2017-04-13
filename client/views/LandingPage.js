

import React from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';

import ev from '../events';
import routes from '../routes';

import ConversationSelector from './landing/ConversationSelector';
import NameModal from './general/NameModal';
import FlowList from './general/FlowList';

const evCon = ev.conversations;
const evConEdit = ev.conversationEdit;
const evNode = ev.nodeEdit;


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
        this.props.getConversations();
        this.state = {modalOpen: false};

        this.addConversation = this.addConversation.bind(this);
        this.openConversation = this.openConversation.bind(this);

        this.openNewConversationModal = this.openNewConversationModal.bind(this);
        this.closeNewConversationModal = this.closeNewConversationModal.bind(this);
    }

    /**
     * Renders this view
     */
    render()
    {
        if (this.props.loading) {
            return (
                <div>Loading...</div>
            );
        }
        else if (this.state.modalOpen) {
            return this.renderModal();
        }
        else {
            return this.renderNoModal();
        }
    }

    renderModal()
    {
        return (
            <NameModal onSubmit={this.addConversation} onClose={this.closeNewConversationModal}/>
        )
    }

    renderNoModal()
    {
        return (
            <div>
                <FlowList horizontal={true}>
                    {this.props.conversations.map(p => <ConversationSelector name={p} key={p} onClick={this.openConversation}/>)}
                </FlowList>

                <button onClick={this.openNewConversationModal}>New Conversation</button>
            </div>
        );
    }

    addConversation(name)
    {
        this.props.addConversation(name);
        this.closeNewConversationModal();
    }

    openConversation(name)
    {
        this.props.loadConversation(name);
        browserHistory(routes.conversation);
    }

    openNewConversationModal()
    {
        this.setState({modalOpen: true});
    }

    closeNewConversationModal()
    {
        this.setState({modalOpen: false});
    }
}

/**
 * Connects the redux state to the view
 */
const mapStateToProps = (state) =>
{
    return {
        conversations: state.conversations.available,
        loading: state.conversations.loading,
    };
};

/**
 * Connects the redux event dispatcher to the view
 */
const mapDispatchToProps = (dispatch) =>
{
    return {
        getConversations: () => dispatch(evCon.fetchConversations()),
        addConversation: name => dispatch(evCon.addConversation({name})),
        loadConversation: name => dispatch(evConEdit.loadConversation({name})),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);


