var React = require('react');

var TreeNode = React.createClass({
	getInitialState: function() {
		return {
			visible: true
		};
	},

	toggle: function() {
    	this.setState({visible: !this.state.visible});
  	},

	render: function() {
		var childNodes;
		if (this.props.node.childNodes != null) {
			childNodes = this.props.node.childNodes.map(function(node, index) {
				return <li key={index}><TreeNode node={node} /></li>
			});
		}

		var style = {};
		if (!this.state.visible) {
			style.display = "none";
		}

		return (
			<div>
				<h5 onClick={this.toggle}>
					{this.props.node.title}
				</h5>
				<ul style={style}>
					{childNodes}
				</ul>
			</div>
		);
	}
});

module.exports = TreeNode;