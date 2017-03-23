var React = require('react');
var TreeData = require('./treeData.js');

var TreeNode = React.createClass({
	getInitialState: function() {
		return {
			visible: true,
			editing: (this.props.node.title == null),
		};
	},
	toggle: function() {
    	this.setState({visible: !this.state.visible});
  	},
  	add: function(){
  		this.props.add(this.props.node.tree_id);
  	},
  	edit: function(){
  		this.setState({editing: true});
  	},
  	CurrentTitle: function(){
  		if(this.state.editing){
  			// return (
  			// 	<input onChange={(e) => this.setState({title: e.target.value})} 
  			// 		onDoubleClick={() => this.setState({editing: false})} />
  			// );
			return (
  				<input onChange={(e) => this.props.edit(this.props.node.tree_id, e.target.value)} 
  					onDoubleClick={() => this.setState({editing: false})} />
  			);
  		} else {
  			return (
  				<h5 className="title" onDoubleClick={this.edit}>
					{this.props.node.title}
				</h5>
			);
  		}
  	},
	render: function() {
		var childNodes;
		if (this.props.node.childNodes != null) {
			childNodes = this.props.node.childNodes.map(function(child, index) {
				return (
					<li key={index}>
						<TreeNode node={child} add={this.props.add} edit={this.props.edit}/>
					</li>
				);
			}.bind(this));
		}

		var style = {};
		if (!this.state.visible) {
			style.display = "none";
		}

		return (
			<div>
				<this.CurrentTitle />
				<button onClick={this.toggle} className="toggle">{this.state.visible ? "Hide" : "Show"}</button>
				<button onClick={this.add}>Add</button>
				<ul className="child-list"style={style}>
					{childNodes}
				</ul>
			</div>
		);
	}
});

module.exports = TreeNode;