
import React from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';

import events from '../events';
import routes from '../routes';

import EditableText from './general/EditableText';
import NameModal from './general/NameModal';

import ContentSection from './general/ContentSection';
import KeyWordSelector from './node/KeyWordSelector';
import PromptSelector from './node/PromptSelector';
import TargetSelector from './node/TargetSelector';

/**
 *
 */
class NodeEditView extends React.Component
{
    /**
     * Expected props:
     */
    constructor(props)
    {
        super(props);

        this.state = {
            addKeyWordModalOpen: false,
            addPromptModalOpen: false,
            addVariableModalOpen: false,
        };

        this.changeName = this.changeName.bind(this);
        this.changeText = this.changeText.bind(this);

        this.goBack = this.goBack.bind(this);

        this.openKeyWordModal = this.openKeyWordModal.bind(this);
        this.closeKeyWordModal = this.closeKeyWordModal.bind(this);
        this.addKeyWord = this.addKeyWord.bind(this);

        this.openPromptModal = this.openPromptModal.bind(this);
        this.closePromptModal = this.closePromptModal.bind(this);
        this.addPrompt = this.addPrompt.bind(this);
    }

    /**
     * Renders this view
     */
    render()
    {
        if (this.state.addKeyWordModalOpen) {
            return (
                <NameModal onSubmit={this.addKeyWord} onCancel={this.closeKeyWordModal}/>
            );
        }
        else if (this.state.addPromptModalOpen) {
            return (
                <NameModal onSubmit={this.addPrompt} onCancel={this.closePromptModal}/>
            );
        }
        else {
            return this.renderNoModal();
        }
    }

    renderNoModal()
    {
        return (
            <div>
                <button onClick={this.goBack}>Go Back</button>

                <ContentSection onClick={this.openKeyWordModal} buttonText="Add Key Word">
                    {this.props.keyWords.map(p => <div key={p}>{p}</div>)}
                </ContentSection>

                <ContentSection onClick={this.openPromptModal} buttonText="Add Prompt">
                    {this.props.prompts.map(p => <div key={p.name}>{p.name}</div>)}
                </ContentSection>

                <EditableText text={this.props.name} onSubmit={this.changeName}/>
                <EditableText text={this.props.text} onSubmit={this.changeText}/>
            </div>
        );
    }

    goBack(event)
    {
        this.props.refreshConversation(this.props.conversation);
        browserHistory.push(routes.conversation);
    }

    changeName(oldName, newName)
    {
        this.props.setName(this.props.conversation, oldName, newName);
    }

    changeText(oldText, newText)
    {
        this.props.setText(this.props.conversation, this.props.name, newText);
    }

    // Key Words

    openKeyWordModal()
    {
        this.setState({addKeyWordModalOpen: true});
    }

    closeKeyWordModal()
    {
        this.setState({addKeyWordModalOpen: false});
    }

    addKeyWord(keyWord)
    {
        this.closeKeyWordModal();
        this.props.addKeyWord(this.props.conversation, this.props.name, keyWord);
    }

    //Prompts

    openPromptModal()
    {
        this.setState({addPromptModalOpen: true});
    }

    closePromptModal()
    {
        this.setState({addPromptModalOpen: false});
    }

    addPrompt(prompt)
    {
        this.closePromptModal();
        this.props.addPrompt(this.props.conversation, this.props.name, prompt);
    }
}

/**
 * Connects the redux state to the view
 */
const mapStateToProps = (state) =>
{
    return {
        conversation: state.conversationEdit.name,
        name: state.nodeEdit.name,
        keyWords: state.nodeEdit.keyWords,
        prompts: state.nodeEdit.prompts,
        text: state.nodeEdit.text,
        targets: state.nodeEdit.targets,
    };
};

/**
 * Connects the redux event dispatcher to the view
 */
const mapDispatchToProps = (dispatch) =>
{
    const ev = events.nodeEdit;

    return {
        refreshConversation: (name) => dispatch(events.conversationEdit.loadConversation({name})),
        setName: (conversationName, oldName, newName) => dispatch(ev.setName({conversationName, oldName, newName})),
        setText: (conversationName, nodeName, text) => dispatch(ev.setText({conversationName, nodeName, text})),

        addKeyWord: (conversationName, nodeName, keyWord) => dispatch(ev.addKeyWord({conversationName, nodeName, keyWord})),
        addPrompt: (conversationName, nodeName, promptName) => dispatch(ev.addPrompt({conversationName, nodeName, promptName})),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NodeEditView);


