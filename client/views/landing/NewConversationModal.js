

import React, {Component} from 'react';
import {connect} from 'react-redux';

/**
 * Renders the modal box for the user to enter a new conversation name
 */
class NewConversationModal extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {conversationName: ''};

        this.updateText = this.updateText.bind(this);
        this.submit = this.submit.bind(this);
        this.cancel = this.cancel.bind(this);
    }

    render()
    {
        return (
            <div className="landing-modal">
                <input className="text-box" type="text" value={this.state.conversationName} onChange={this.updateText}/>
                <button className="landing-modal-button" onClick={this.submit}>Submit</button>
                <button className="landing-modal-button" onClick={this.cancel}>Cancel</button>
            </div>
        );
    }

    /**
     * Updates the text in the text box
     * @param source
     */
    updateText(event)
    {
        this.setState({conversationName: event.target.value});
    }

    /**
     * Submits the user's conversation choice, then closes this box
     */
    submit()
    {
        console.log(`Adding conversation ${this.state.conversationName}`);
        this.props.onClose();
    }

    /**
     * Closes this box
     */
    cancel()
    {
        this.props.onClose();
    }
}

const mapStateToProps = (state) =>
{
    return {

    };
};

const mapDispatchToProps = (dispatch) =>
{
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewConversationModal);