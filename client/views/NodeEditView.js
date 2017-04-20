
import React from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import Panel from 'react-bootstrap/lib/Panel';

import events from '../events';
import routes from '../routes';

import EditableText from './general/EditableText';
import EditableHeader from './general/EditableHeader';
import NameModal from './general/NameModal';
import ContentSection from './general/ContentSection';
import ListItemSelector from './general/ListItemSelector';

import PromptEditModal from './node/PromptEditModal';
import PromptListSelector from './node/PromptListSelector';
import Button from 'react-bootstrap/lib/Button';


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
            editPromptModalOpen: false,
            addVariableModalOpen: false,
            selectedPrompt: '',
        };

        this.changeName = this.changeName.bind(this);
        this.changeText = this.changeText.bind(this);

        this.goBack = this.goBack.bind(this);

        this.openKeyWordModal = this.openKeyWordModal.bind(this);
        this.closeKeyWordModal = this.closeKeyWordModal.bind(this);
        this.addKeyWord = this.addKeyWord.bind(this);
        this.deleteKeyWord = this.deleteKeyWord.bind(this);

        this.openPromptModal = this.openPromptModal.bind(this);
        this.closePromptModal = this.closePromptModal.bind(this);
        this.addPrompt = this.addPrompt.bind(this);
        this.deletePrompt = this.deletePrompt.bind(this);

        this.openPromptEditModal = this.openPromptEditModal.bind(this);
        this.closePromptEditModal = this.closePromptEditModal.bind(this);
        this.updatePrompt = this.updatePrompt.bind(this);
    }

    /**
     * Renders this view
     */
    render()
    {
        const prompt = this.getPrompt();
        const body = this.getBody();

        return (
            <div>
                {prompt}
                {body}
            </div>
        )
    }

    getPrompt()
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
        else if (this.state.editPromptModalOpen) {

            const prompt = this.props.prompts.find(p => p.name == this.state.selectedPrompt);
            console.log(prompt);

            return (
                <PromptEditModal
                    onSubmit={this.updatePrompt}
                    onCancel={this.closePromptEditModal}
                    initialName={prompt.name}
                    initialText={prompt.text}
                    initialVariable={prompt.target}
                />
            )
        }
    }

    getBody()
    {
        return (
            <div>
                <Button onClick={this.goBack}>Go Back</Button>

                <EditableHeader text={this.props.name} onSubmit={this.changeName}/>
                <EditableText text={this.props.text} onSubmit={this.changeText}/>

                <ContentSection onClick={this.openKeyWordModal} buttonText="Add Key Word">
                    {this.props.keyWords.map(p => <ListItemSelector key={p} name={p} onDelete={this.deleteKeyWord}/>)}
                </ContentSection>

                <ContentSection onClick={this.openPromptModal} buttonText="Add Prompt">
                    {this.props.prompts.map(p => <PromptListSelector key={p.name} name={p.name} onDelete={this.deletePrompt} onEdit={this.openPromptEditModal}/>)}
                </ContentSection>

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

    deleteKeyWord(keyWord)
    {
        this.props.deleteKeyWord(this.props.conversation, this.props.name, keyWord);
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

    deletePrompt(prompt)
    {
        this.props.deletePrompt(this.props.conversation, this.props.name, prompt);
    }

    // Prompt Edit

    openPromptEditModal(name)
    {
        this.setState({editPromptModalOpen: true, selectedPrompt: name});
    }

    closePromptEditModal()
    {
        this.setState({editPromptModalOpen: false, selectedPrompt: ''});
    }

    updatePrompt(prompt, text, variable)
    {
        console.log(prompt);
        console.log(text);
        console.log(variable);

        this.props.updatePrompt(this.props.conversation, this.props.name, prompt, text, variable);
        this.closePromptEditModal();
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
        deleteKeyWord: (conversationName, nodeName, keyWord) => dispatch(ev.removeKeyWord({conversationName, nodeName, keyWord})),

        addPrompt: (conversationName, nodeName, promptName) => dispatch(ev.addPrompt({conversationName, nodeName, promptName})),
        deletePrompt: (conversationName, nodeName, promptName) => dispatch(ev.removePrompt({conversationName, nodeName, promptName})),

        updatePrompt: (conversationName, nodeName, promptName, promptText, variableSet) => dispatch(ev.updatePrompt({
            conversationName,
            nodeName,
            promptName,
            promptText,
            variableSet,
        })),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NodeEditView);


