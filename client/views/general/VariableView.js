
import React from 'react';

/**
 * Displays a variable. This variable can be toggled between a static version and an editable one
 */
class VariableView extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            nameText: props.name,
            editing: false,
        };

        this.toggleEditing = this.toggleEditing.bind(this);
        this.updateNameText = this.updateNameText.bind(this);
    }

    render()
    {
        return (
            <div className="variable-display">
                {this.state.editing ? this.renderEditing() : this.renderStatic()}
                <button onClick={() => this.props.onDelete(this.props.name)}>Delete</button>
            </div>
        );
    }

    /**
     * Renders the editable form of this view
     */
    renderEditing()
    {
        return (
            <div>
                <input type="text" value={this.state.nameText}
                       onChange={this.updateNameText}
                       onSubmit={() => this.props.onChange(this.props.name, this.state.nameText)}/>

                <button onClick={this.toggleEditing}>Cancel</button>
            </div>
        );
    }

    /**
     * Renders the non-editable form of this view
     */
    renderStatic()
    {
        return (
            <div onClick={this.toggleEditing}>
                {this.props.name}
            </div>
        );
    }

    /**
     * Toggles the current editing state of this view
     */
    toggleEditing()
    {
        this.setState({editing: !this.state.editing});
    }

    /**
     * Updates the text in the name
     * @param event
     */
    updateNameText(event)
    {
        this.setState({nameText: event.target.value});
    }
}

export default VariableView;