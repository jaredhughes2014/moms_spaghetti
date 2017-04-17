import React from 'react';
import {connect} from 'react-redux';

import events from '../events';

import ContentSection from './conversation/ContentSection';
import NodeSelector from './conversation/NodeSelector';
import TargetSelector from './conversation/TargetSelector';
import VariableSelector from './conversation/VariableSelector';
import NameModal from './general/NameModal';

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
        };

        this.openAddNodeModal = this.openAddNodeModal.bind(this);
        this.closeAddNodeModal = this.closeAddNodeModal.bind(this);
        this.addNode = this.addNode.bind(this);

        this.onNodeMove = this.onNodeMove.bind(this);
        this.onNodeStartMove = this.onNodeStartMove.bind(this);
        this.onConnect = this.onConnect.bind(this);
    }

    /**
     * Renders this view
     */
    render()
    {
        if (this.props.loading) {
            return (
                <div>Loading...</div>
            )
        }
        if (this.state.addNodeModalOpen) {
            return this.renderNodeModal();
        }
        else {
            return this.renderNoModal();
        }
    }

    renderNodeModal()
    {
        return (
            <NameModal onSubmit={this.addNode} onCancel={this.closeAddNodeModal}/>
        )
    }

    renderNoModal()
    {
        return (
            <div>
                <button onClick={this.openAddNodeModal}>Add Node</button>
                <div>{this.props.name ? this.props.name : 'NO NAME SET'}</div>
                <ConversationNodeGraph
                    conversationNodes={this.props.nodes}
                    onMove={this.onNodeMove}
                    onStartMove={this.onNodeStartMove}
                    onConnect={this.onConnect}/>
            </div>
        );
    }

    // Movement functions

    onNodeMove(nid, pos)
    {
        this.props.updateNodePosition(this.props.name, nid, pos.left, pos.top);
    }

    onNodeStartMove(nid)
    {
    }

    onConnect(fromNid, from, toNid, to)
    {
        this.props.addTarget(this.props.name, from, to);
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
        addTarget: (conversationName, nodeName, targetName) => dispatch(
                ev.addNodeTarget({conversationName, nodeName, targetName})
            ),
        updateNodePosition: (conversationName, nodeName, x, y) => dispatch(
                ev.updateNodePosition({conversationName, nodeName, x, y})
            ),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ConversationEditView);


