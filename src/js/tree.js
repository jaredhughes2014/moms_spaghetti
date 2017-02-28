var React = require('react');
var TreeNode = require('./treeNode.js');

var Tree = React.createClass({
	render: function(){
		return (
			<div>
				<TreeNode node={this.props.node}/>
			</div>
		);
	}
});
module.exports = Tree;