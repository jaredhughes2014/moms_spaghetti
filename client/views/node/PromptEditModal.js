import React, {Component} from 'react';
import Button from 'react-bootstrap/lib/Button';
import FormControl from 'react-bootstrap/lib/Formcontrol';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';


/**
 * Renders the modal box for the user to enter a name
 */
class PromptEditModal extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            name: this.props.initialName || '',
            variable: this.props.initialVariable || '',
            content: this.props.initialText || '',
        };

        this.updateNameText = this.updateNameText.bind(this);
        this.updateVariableText = this.updateVariableText.bind(this);
        this.updateContentText = this.updateContentText.bind(this);

        this.submit = this.submit.bind(this);
        this.cancel = this.cancel.bind(this);
    }

    render()
    {
        return (
            <div className="prompt-modal">
                <div>
                    <ControlLabel>Prompt Name</ControlLabel>
                    <FormControl type="text" value={this.state.name} onChange={this.updateNameText}/>
                </div>
                <div>
                    <ControlLabel>Text</ControlLabel>
                    <FormControl type="text" value={this.state.content} onChange={this.updateContentText}/>
                </div>
                <div>
                    <ControlLabel>Variable Changed</ControlLabel>
                    <FormControl type="text" value={this.state.variable} onChange={this.updateVariableText}/>
                </div>

                <Button className="name-modal-button" onClick={this.submit}>Submit</Button>
                <Button className="name-modal-button" onClick={this.cancel}>Cancel</Button>
            </div>
        );
    }

    /**
     * Updates the text in the text box
     */
    updateNameText(event)
    {
        this.setState({name: event.target.value});
    }

    updateVariableText(event)
    {
        this.setState({variable: event.target.value});
    }

    updateContentText(event)
    {
        this.setState({content: event.target.value});
    }

    /**
     * Submits the user's conversation choice, then closes this box
     */
    submit()
    {
        this.props.onSubmit(this.state.name, this.state.content, this.state.variable);
    }

    /**
     * Closes this box
     */
    cancel()
    {
        this.props.onCancel();
    }
}

export default PromptEditModal;