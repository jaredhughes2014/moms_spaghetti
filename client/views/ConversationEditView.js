import React from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';

import events from '../events';
import routes from '../routes';

import ContentSection from './general/ContentSection';
import EditableText from './general/EditableText';
import NameModal from './general/NameModal';
import TreeNodeModal from './general/TreeNodeModal';

import ConversationNodeGraph from './conversation/ConversationNodeGraph';

/**
 *
 */
class ConversationEditView extends React.Component
{
    /**
     * Expected props:
     */
    constructor(props)
    {
        super(props);

        this.state = {
            addNodeModalOpen: false,
            addVariableModalOpen: false,
            addTriggerModalOpen: false,
        };

        this.openAddNodeModal = this.openAddNodeModal.bind(this);
        this.closeAddNodeModal = this.closeAddNodeModal.bind(this);
        this.addNode = this.addNode.bind(this);

        this.openAddTriggerModal = this.openAddTriggerModal.bind(this);
        this.closeAddTriggerModal = this.closeAddTriggerModal.bind(this);
        this.addTrigger = this.addTrigger.bind(this);

        this.openAddVariableModal = this.openAddVariableModal.bind(this);
        this.closeAddVariableModal = this.closeAddVariableModal.bind(this);
        this.addVariable = this.addVariable.bind(this);

        this.onNodeMove = this.onNodeMove.bind(this);
        this.onNodeStartMove = this.onNodeStartMove.bind(this);
        this.onConnect = this.onConnect.bind(this);

        this.submitConversationName = this.submitConversationName.bind(this);
    }

    /**
     * Renders this view
     */
    getView()
    {
        if (this.props.loading) {
            return (
                <div>Loading...</div>
            )
        }
        else if (this.state.addNodeModalOpen) {
            return (
                <NameModal onSubmit={this.addNode} onCancel={this.closeAddNodeModal}/>
            )
        }
        else if (this.state.addTriggerModalOpen) {
            return (
                <NameModal onSubmit={this.addTrigger} onCancel={this.closeAddTriggerModal}/>
            )
        }
        else if (this.state.addVariableModalOpen) {
            return (
                <NameModal onSubmit={this.addVariable} onCancel={this.closeAddVariableModal}/>
            )
        }
    }

	render() {

		const modalView = this.getView();

		const modal = (
			<TreeNodeModal node={this.renderNoModal()}>
                <ContentSection onClick={this.openAddVariableModal} buttonText="Add Variable">
                    {this.props.variables.map(p => <div key={p.name}>{p.name}</div>)}
                </ContentSection>

                <ContentSection onClick={this.openAddTriggerModal} buttonText="Add Trigger">
                    {this.props.triggers.map(p => <div key={p}>{p}</div>)}
                </ContentSection>

                <button onClick={this.openAddNodeModal}>Add Node</button>
				{modalView}
			</TreeNodeModal>
		);

		return (
			<div>
                <EditableText text={this.props.name} onSubmit={this.submitConversationName}/>
				{modal}
			</div>
		);
	}

    renderNoModal()
    {
        return (
            <div>
                <ConversationNodeGraph
                    conversationNodes={this.props.nodes}
                    onMove={this.onNodeMove}
                    onStartMove={this.onNodeStartMove}
                    onConnect={this.onConnect}/>
            </div>
        );
    }

    submitConversationName(oldName, name)
    {
        this.props.setName(oldName, name);
    }

    // Movement functions

    onNodeMove(nid, pos)
    {
        const node = this.props.nodes.find(p => p.name == nid);

        if (node.x == pos.left && node.y == pos.top) {
            this.props.loadNode(this.props.name, nid);
            browserHistory.push(routes.node);
        }
        else {
            this.props.updateNodePosition(this.props.name, nid, pos.left, pos.top);
        }
    }

    onNodeStartMove() {}

    onConnect(fromNid, from, toNid, to)
    {
        this.props.addTarget(this.props.name, fromNid, toNid);
    }

    // Add node modal

    openAddNodeModal()
    {
        this.setState({addNodeModalOpen: true});
    }

    closeAddNodeModal()
    {
        this.setState({addNodeModalOpen: false});
    }

    addNode(name)
    {
        this.closeAddNodeModal();
        this.props.addNode(this.props.name, name);
    }

    // Add key word modal

    openAddTriggerModal()
    {
        this.setState({addTriggerModalOpen: true});
    }

    closeAddTriggerModal()
    {
        this.setState({addTriggerModalOpen: false});
    }

    addTrigger(name)
    {
        this.closeAddTriggerModal();
        this.props.addTrigger(this.props.name, name);
    }

    // Add variable modal

    openAddVariableModal()
    {
        this.setState({addVariableModalOpen: true});
    }

    closeAddVariableModal()
    {
        this.setState({addVariableModalOpen: false});
    }

    addVariable(name)
    {
        this.closeAddVariableModal();
        this.props.addVariable(this.props.name, name);
    }
}

/**
 * Connects the redux state to the view
 */
const mapStateToProps = (state) =>
{
    return {
        name: state.conversationEdit.name,
        nodes: state.conversationEdit.nodes,
        triggers: state.conversationEdit.triggers,
        variables: state.conversationEdit.variables,
        loading: state.conversationEdit.loading,
    };
};

/**
 * Connects the redux event dispatcher to the view
 */
const mapDispatchToProps = (dispatch) =>
{
    const ev = events.conversationEdit;

    return {
        setName: (oldName, newName) => dispatch(ev.setName({oldName, newName})),

        addNode: (conversationName, nodeName) => dispatch(ev.addNode({conversationName, nodeName})),
        removeNode: (conversationName, nodeName) => dispatch(ev.removeNode({conversationName, nodeName})),

        addTrigger: (conversationName, triggerName) => dispatch(ev.addTrigger({conversationName, triggerName})),
        addVariable: (conversationName, variableName) => dispatch(ev.addVariable({conversationName, variableName})),

        addTarget: (conversationName, nodeName, targetName) => dispatch(
                ev.addNodeTarget({conversationName, nodeName, targetName})
            ),
        updateNodePosition: (conversationName, nodeName, x, y) => dispatch(
                ev.updateNodePosition({conversationName, nodeName, x, y})
            ),
        loadNode: (conversationName, nodeName) => dispatch(events.nodeEdit.loadNode({conversationName, nodeName}))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ConversationEditView);
