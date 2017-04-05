
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';

import paths from '../../paths';
import ev from '../events';

import NodeSelector from './presentation/edit/NodeSelector';
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
        console.log('Node added');
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
        console.log("Adding trigger: " + this.state.triggerText);
        this.setState({triggerText: ''});
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
        console.log("Adding variable: " + this.state.triggerText);
        this.setState({triggerText: ''});
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
        let c = this.props.conversation;

        let nodes = this.renderConversationNodes();
        let triggers = this.renderTriggers();
        let variables = this.renderVariables();

        return (
            <div id="edit-conversation-root">
                <div id="edit-conversation-title">
                    {c.name}
                </div>

                <div id="edit-conversation-content">
                    {nodes}
                    {triggers}
                    {variables}
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
        let c = this.props.conversation;

        let variables = null;
        if (c.triggers.length == 0) {
            variables = <div>No variables added yet</div>;
        }
        else {
            variables =
                <FlowList horizontal={false}>
                    {c.variables.map(p => <VariableView onClick={this.deleteVariable} text={p.name} key={p.name}/>)}
                </FlowList>;
        }

        return (
            <div id="edit-variables-root">
                <div className="edit-content-title">
                    Variables
                </div>
                {variables}

                <input type="text" value={this.state.variableText} onChange={this.updateVariableText}/>
                <button onClick={this.addTrigger}>Submit</button>
            </div>
        );
    }

    /**
     * Renders the trigger phrases for the conversation
     */
    renderTriggers()
    {
        let c = this.props.conversation;

        let triggers = null;

        if (c.triggers.length == 0) {
            triggers = <div>No triggers added yet</div>;
        }

        else {
            triggers =
                <FlowList horizontal={false}>
                    {c.triggers.map(p => <TriggerView onClick={this.deleteTrigger} text={p} key={p}/>)}
                </FlowList>;
        }

        return (
            <div id="edit-triggers-root">
                <div className="edit-content-title">
                    Triggers
                </div>
                {triggers}

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
        let c = this.props.conversation;

        let list = null;
        if (c.nodes.length == 0) {
            list = <div>No Nodes added yet</div>
        }
        else {
            list =
                <FlowList horizontal={false}>
                    {c.nodes.map(p => <NodeSelector id={p.id} key={p.id} onClick={this.selectNode}/>)}
                </FlowList>;
        }

        return (
            <div id="node-selection">
                <div className="edit-content-title">
                    Nodes
                </div>
                {list}
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
        goBack : () => dispatch(events.setActiveConversation.create(null))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditConversationView);
