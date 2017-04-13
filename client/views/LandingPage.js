

import React from 'react';
import {connect} from 'react-redux';

import ev from '../events';
import paths from '../routes';

import ConversationSelector from './landing/ConversationSelector';
const evCon = ev.conversations;
const evConEdit = ev.conversationEdit;
const evNode = ev.nodeEdit;
import {Link} from 'react-router';


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
    }

    /**
     * Renders this view
     */
    render()
    {
        this.props.testAPI();

        return (
            <Link to={paths.conversation}>Edit</Link>
        );
    }
}

/**
 * Connects the redux state to the view
 */
const mapStateToProps = (state) =>
{
    return {

    };
};

/**
 * Connects the redux event dispatcher to the view
 */
const mapDispatchToProps = (dispatch) =>
{
    return {
        testAPI: () => {
            console.log('Testing all asynchronous events');

            // Conversations
            dispatch(evCon.addConversation({name: 'name'}));
            dispatch(evCon.removeConversation({name: 'name'}));
            dispatch(evCon.fetchConversations());

            // Conversation Edit
            dispatch(evConEdit.setName({oldName: 'name1', newName: 'name2'}));
            dispatch(evConEdit.loadConversation({name: 'name'}));

            dispatch(evConEdit.addNode({conversationName: 'cName', nodeName: 'nName'}));
            dispatch(evConEdit.removeNode({conversationName: 'cName', nodeName: 'nName'}));

            dispatch(evConEdit.addTrigger({conversationName: 'cName', word: 'tName'}));
            dispatch(evConEdit.removeTrigger({conversationName: 'cName', word: 'tName'}));

            dispatch(evConEdit.addVariable({conversationName: 'cName', variableName: 'vName'}));
            dispatch(evConEdit.removeVariable({conversationName: 'cName', variableName: 'vName'}));

            // Node Edit
            dispatch(evNode.setName({conversationName: 'cName', oldName: 'nName1', newName: 'nName2',}));
            dispatch(evNode.setText({conversationName: 'cName', nodeName: 'nName', text: 'text',}));
            dispatch(evNode.loadNode({conversationName: 'cName', nodeName: 'nName',}));

            dispatch(evNode.addPrompt({conversationName: 'cName', nodeName: 'nName', promptName: 'pName'}));
            dispatch(evNode.removePrompt({conversationName: 'cName', nodeName: 'nName', promptName: 'pName'}));
            dispatch(evNode.updatePrompt({conversationName: 'cName', nodeName: 'nName', promptName: 'pName', promptText: 'text', variableSet: 'vName'}));

            dispatch(evNode.addKeyWord({conversationName: 'cName', nodeName: 'nName', keyWord: 'pName',}));
            dispatch(evNode.removeKeyWord({conversationName: 'cName', nodeName: 'nName', keyWord: 'pName',}));

            dispatch(evNode.addTarget({conversationName: 'cName', nodeName: 'nName', targetName: 'pName',}));
            dispatch(evNode.removeTarget({conversationName: 'cName', nodeName: 'nName', targetName: 'pName',}));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);


