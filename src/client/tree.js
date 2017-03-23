import React from 'react';
import TreeNode from './treeNode';

var Tree = React.createClass({
	render: function(){
		return (
			<div>
				<TreeNode node={this.props.node}/>
			</div>
		);
	}
});
export default Tree;