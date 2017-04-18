
import React from 'react';

/**
 * Represents a label that can be clicked to become editable
 */
class EditableText extends React.Component
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
                        <input type="text" value={this.state.content} onChange={this.updateText}/>
                        <button onClick={this.onSubmit}>Submit</button>
                        <button onClick={this.closeEdit}>Cancel</button>
                    </span>
                </div>
            )
        }
        else {
            return (
                <div onClick={this.onClickLabel}>{this.props.text}</div>
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

export default EditableText;