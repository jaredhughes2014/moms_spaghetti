var React = require('react');

var TreeNode = React.createClass({
	getInitialState: function() {
		return {
			visible: true,
			editing: (this.props.node.title == null),
			title: this.props.node.title,
			childNodes: this.props.node.childNodes
		};
	},
	toggle: function() {
    	this.setState({visible: !this.state.visible});
  	},
  	add: function(){
  		if(this.state.childNodes != null){
  			this.setState({childNodes: this.state.childNodes.concat([{title: null}])});
  		} else {
  			this.setState({childNodes: [{title: null}]});
  		}
  	},
  	edit: function(){
  		this.setState({editing: true});
  	},
  	CurrentTitle: function(){
  		if(this.state.editing){
  			return (
  				<input onChange={(e) => this.setState({title: e.target.value})} 
  					onDoubleClick={() => this.setState({editing: false})} />
  			);
  		} else {
  			return (
  				<h5 className="title" onDoubleClick={this.edit}>
					{this.state.title}
				</h5>
			);
  		}
  	},
	render: function() {
		var childNodes;
		if (this.state.childNodes != null) {
			childNodes = this.state.childNodes.map(function(node, index) {
				return <li key={index}><TreeNode node={node} /></li>
			});
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