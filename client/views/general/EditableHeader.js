
import React from 'react';
import FormControl from 'react-bootstrap/lib/Formcontrol';
import Button from 'react-bootstrap/lib/Button';


/**
 * Represents a label that can be clicked to become editable
 */
class EditableHeader extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            content: '',
            selected: false,
        };

        this.onClickLabel = this.onClickLabel.bind(this);
        this.closeEdit = this.closeEdit.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.updateText = this.updateText.bind(this);
    }

    render()
    {
        if (this.state.selected) {
            return (
                <div>
                    <span>
                        <FormControl type="text" value={this.state.content} onChange={this.updateText}/>
                        <Button onClick={this.onSubmit}>Submit</Button>
                        <Button onClick={this.closeEdit}>Cancel</Button>
                    </span>
                </div>
            )
        }
        else {
            return (
                <h1 onClick={this.onClickLabel}>{this.props.text}</h1>
            )
        }
    }

    updateText(event)
    {
        this.setState({content: event.target.value});
    }

    onClickLabel()
    {
        this.setState({
            content: this.props.text,
            selected: true,
        })
    }

    closeEdit()
    {
        this.setState({selected: false});
    }

    onSubmit()
    {
        this.closeEdit();
        this.props.onSubmit(this.props.text, this.state.content);
    }
}

export default EditableHeader;