import React from 'react';
import {
	Modal,
	Button
} from 'react-bootstrap';

const TreeNodeModal = React.createClass({
	getInitialState() {
		return { showModal: false };
	},

	close() {
		this.setState({ showModal: false });
	},

	open() {
		this.setState({ showModal: true });
	},

	render() {
		return (
			<div onClick={this.open} className="modalWrapper">
				{this.props.node}
				<Modal show={this.state.showModal} onHide={this.close} className="modal">
					<Modal.Header closeButton>
						<Modal.Title>Edit Node</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						{this.props.children}
					</Modal.Body>
				</Modal>
			</div>
		);
	}
});

export default TreeNodeModal;
