import React, {Component} from 'react';

/**
 * Renders the modal box for the user to enter a name
 */
class NameModal extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {name: ''};

        this.updateText = this.updateText.bind(this);
        this.submit = this.submit.bind(this);
        this.cancel = this.cancel.bind(this);
    }

    render()
    {
        return (
            <div className="name-modal">
                <input type="text" value={this.state.name} onChange={this.updateText}/>
                <button className="name-modal-button" onClick={this.submit}>Submit</button>
                <button className="name-modal-button" onClick={this.cancel}>Cancel</button>
            </div>
        );
    }

    /**
     * Updates the text in the text box
     */
    updateText(event)
    {
        this.setState({name: event.target.value});
    }

    /**
     * Submits the user's conversation choice, then closes this box
     */
    submit()
    {
        this.props.onSubmit(this.state.name);
    }

    /**
     * Closes this box
     */
    cancel()
    {
        this.props.onCancel();
    }
}

export default NameModal;