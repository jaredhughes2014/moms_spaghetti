import React, {Component} from 'react';

import Button from 'react-bootstrap/lib/Button';
import FormControl from 'react-bootstrap/lib/FormControl';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import Modal from 'react-bootstrap/lib/Modal';


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
            <div className="static-modal">
                <Modal.Dialog>
                    <Modal.Header>
                        <Modal.Title>Enter a name</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <ControlLabel>Name</ControlLabel>
                        <FormControl type="text" value={this.state.name} onChange={this.updateText}/>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button className="name-modal-button" onClick={this.submit}>Submit</Button>
                        <Button className="name-modal-button" onClick={this.cancel}>Cancel</Button>
                    </Modal.Footer>
                </Modal.Dialog>
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