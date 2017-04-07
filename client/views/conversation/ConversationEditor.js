

import React from 'react';
import {browserHistory, Link} from 'react-router';
import {connect} from 'react-redux';

import paths from '../../../app/paths';

import NodeSelector from './NodeSelector';
import FlowList from '../../views2/general/FlowList';
import VariableView from '../../views2/general/VariableView';
import NameModal from '../../views2/general/NameModal';


/**
 * Top-level view for the conversation editor
 */
class ConversationEditor extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            nodeModalOpen: false,
            variableModalOpen: false,
        };

        this.selectNode = this.selectNode.bind(this);

        this.addNode = this.addNode.bind(this);
        this.closeNodeModal = this.closeNodeModal.bind(this);
        this.openNodeModal = this.openNodeModal.bind(this);

        this.addVariable = this.addVariable.bind(this);
        this.closeVariableModal = this.closeVariableModal.bind(this);
        this.openVariableModal = this.openVariableModal.bind(this);

        this.renameVariable = this.renameVariable.bind(this);
        this.deleteVariable = this.deleteVariable.bind(this);
    }

    render()
    {
        if (this.state.variableModalOpen || this.state.nodeModalOpen) {
            return this.renderModal();
        }
        else {
            return this.renderNoModal();
        }
    }

    /**
     * Renders the current modal dialogue if one should be open
     * @returns {XML}
     */
    renderModal()
    {
        if (this.state.nodeModalOpen) {
            return <NameModal onSubmit={this.addNode} onCancel={this.closeNodeModal}/>
        }
        else if (this.state.variableModalOpen) {
            return <NameModal onSubmit={this.addVariable} onCancel={this.closeVariableModal}/>
        }
    }

    renderNoModal()
    {
        let c = this.props.conversation;
        return (
            <div id="conversation-editor">
                <Link to={paths.index}>Back</Link>

                <h1>{c.name}</h1>

                <div id="oonversation-editor-nodes">
                    <h2>Nodes</h2>

                    <FlowList horizontal={false}>
                        {c.nodes.map(p => <NodeSelector key={p.name} name={p.name} onClick={this.selectNode}/>)}
                    </FlowList>

                    <button onClick={this.openNodeModal}>Add Node</button>
                </div>

                <div id="oonversation-editor-variables">
                    <h2>Variables</h2>

                    <FlowList horizontal={false}>
                        {c.variables.map(p => <VariableView key={p.name}
                                                            name={p.name}
                                                            onChange={this.renameVariable}
                                                            onDelete={this.deleteVariable}/>)}
                    </FlowList>

                    <button onClick={this.openVariableModal}>Add Variable</button>
                </div>
            </div>
        )
    }

    /**
     * Selects the node to edit
     */
    selectNode(name)
    {
        console.log(`Selected ${name}`)
    }

    /**
     * Opens the variable modal
     */
    openVariableModal()
    {
        this.setState({variableModalOpen: true});
    }

    /**
     * Opens the node modal
     */
    openNodeModal()
    {
        this.setState({nodeModalOpen: true});
    }

    /**
     * Adds a variable to the active conversation
     */
    addVariable(name)
    {
        console.log(`Adding variable ${name}`);
        this.closeNodeModal();
    }

    /**
     * Adds a node to the active conversation
     */
    addNode(name)
    {
        console.log(`Adding node ${name}`);
        this.closeVariableModal();
    }

    /**
     * Closes the modal window for creating a node
     */
    closeNodeModal()
    {
        console.log('closing nodes');
        this.setState({nodeModalOpen: false});
    }

    /**
     * Closes the nodal window for creating a variable
     */
    closeVariableModal()
    {
        console.log('closing variables');
        this.setState({variableModalOpen: false});
    }

    renameVariable(oldName, newName)
    {
        console.log(`Renaming ${oldName} to ${newName}`);
    }

    deleteVariable(name)
    {
        console.log(`Deleting ${name}`);
    }

}

const mapStateToProps = (state) =>
{
    return {
        conversation: state.conversations.active,
    };
};

const mapDispatchToProps = (dispatch) =>
{
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ConversationEditor);