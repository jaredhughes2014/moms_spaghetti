
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';

import paths from '../../paths';
import ev from '../events';
import api from '../api';

import NodeSection from './presentation/edit/NodeSection';
import TriggerSection from './presentation/edit/TriggerSection';
import VariableSection from './presentation/edit/VariableSection';


import FlowList from './presentation/FlowList';
import TriggerView from './presentation/edit/TriggerView';
import VariableView from './presentation/edit/VariableView';

let events = ev.conversation;

/**
 * View used to edit a conversation
 */
class EditConversationView extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            triggerText: "",
            variableText: "",
        };

        this.bindTriggers();
    }

    /**
     * Binds all functions which will be executed as a result of changes in the view.
     */
    bindTriggers()
    {
        // View Events
        this.deselectConversation = this.deselectConversation.bind(this);
        this.selectNode = this.selectNode.bind(this);
        this.addNode = this.addNode.bind(this);

        // Trigger Events
        this.deleteTrigger = this.deleteTrigger.bind(this);
        this.addTrigger = this.addTrigger.bind(this);
        this.updateTriggerText = this.updateTriggerText.bind(this);

        // Variable Events
        this.deleteVariable = this.deleteVariable.bind(this);
        this.addVariable = this.addVariable.bind(this);
        this.updateVariableText = this.updateVariableText.bind(this);
    }

    /**
     * Removes the user's selection and goes back to the conversation selection page
     */
    deselectConversation()
    {
        this.props.goBack();
        browserHistory.push(paths.index);
    }

    /**
     * Selects a node to use for editing
     */
    selectNode()
    {
        console.log('Node Selected');
    }

    /**
     * Adds a new node to the conversation
     */
    addNode()
    {
        this.props.addNode();
        api.saveConversation(this.state.conversation, () => {

        });
    }

    /**
     * Deletes a trigger from the current conversation
     */
    deleteTrigger(text)
    {
        console.log("Deleting trigger: " + text);
    }

    /**
     * Adds a trigger to the current conversation
     */
    addTrigger()
    {
        this.props.addTrigger(this.state.triggerText);
        this.setState({triggerText: ''});
        api.saveConversation(this.state.conversation);
    }

    /**
     * Deletes a trigger from the current conversation
     */
    deleteVariable(text)
    {
        console.log("Deleting variable: " + text);
    }

    /**
     * Adds a trigger to the current conversation
     */
    addVariable()
    {
        this.props.addVariable(this.state.variableText);
        this.setState({variableText: ''});
        api.saveConversation(this.state.conversation);
    }

    /**
     * Updates the state of the trigger form text
     * @param event
     */
    updateTriggerText(event)
    {
        this.setState({triggerText: event.target.value});
    }

    /**
     * Updates the state of the trigger form text
     * @param event
     */
    updateVariableText(event)
    {
        this.setState({variableText: event.target.value});
    }

    /**
     * Renders the view
     */
    render()
    {
        return (
            <div id="edit-conversation-root">
                <div id="edit-conversation-title">
                    {this.props.conversation.name}
                </div>

                <div id="edit-conversation-content">
                    {this.renderConversationNodes()}
                    {this.renderTriggers()}
                    {this.renderVariables()}
                </div>

                <button onClick={this.deselectConversation}>Back</button>
            </div>
        );
    }

    /**
     * Renders the trigger phrases for the conversation
     */
    renderVariables()
    {
        return (
            <div id="edit-variables-root">
                <div className="edit-content-title">
                    Variables
                </div>
                <VariableSection variables={this.props.conversation.variables} onDelete={this.deleteVariable}/>

                <input type="text" value={this.state.variableText} onChange={this.updateVariableText}/>
                <button onClick={this.addVariable}>Submit</button>
            </div>
        );
    }

    /**
     * Renders the trigger phrases for the conversation
     */
    renderTriggers()
    {
        return (
            <div id="edit-triggers-root">
                <div className="edit-content-title">
                    Triggers
                </div>
                <TriggerSection triggers={this.props.conversation.triggers} onDelete={this.deleteTrigger}/>

                <input type="text" value={this.state.triggerText} onChange={this.updateTriggerText}/>
                <button onClick={this.addTrigger}>Submit</button>
            </div>
        );
    }

    /**
     * Renders the selectors for the conversation nodes
     */
    renderConversationNodes()
    {
        return (
            <div id="node-selection">
                <div className="edit-content-title">
                    Nodes
                </div>
                <NodeSection nodes={this.props.conversation.nodes} onClick={this.selectNode}/>
                <button onClick={this.addNode}>New</button>
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
        conversation: state.conversation.active
    };
};

/**
 * Maps the redux event dispatcher to the conversation window
 */
const mapDispatchToProps = (dispatch) =>
{
    return {
        goBack : () => dispatch(events.setActiveConversation.create(null)),
        addTrigger: (text) => dispatch(events.addTrigger.create(text)),
        addVariable: (name) => dispatch(events.addVariable.create(name)),
        addNode: () => dispatch(events.addNode.create()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditConversationView);
