const React = require('react');
const TreeData = require('./treeData.js');
const FormControl = require('react-bootstrap/lib/FormControl');
const Button = require('react-bootstrap/lib/Button');
import TreeNodeModal from './components/TreeNodeModal';

const TreeNode = React.createClass({
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
  	CurrentTitle: function({openModal}){
  		if(this.state.editing && false){
			return (
  				<span className="input-node"><FormControl onChange={(e) => this.props.edit(this.props.node.tree_id, e.target.value)}
  					onDoubleClick={() => this.setState({editing: false})} /></span>
  			);
  		} else {
  			return (
  				<h4 className="title" onDoubleClick={openModal}>
					{this.props.node.title}
				</h4>
			);
  		}
  	},
	render: function() {
		let childNodes;
		if (this.props.node.childNodes != null) {
			childNodes = this.props.node.childNodes.map(function(child, index) {
				return (
					<li key={index}>
						<TreeNode node={child} add={this.props.add} edit={this.props.edit}/>
					</li>
				);
			}.bind(this));
		}

		let style = {};
		if (!this.state.visible) {
			style.display = "none";
		}

		return (
			<div>
				<TreeNodeModal>
					<this.CurrentTitle />
				</TreeNodeModal>
				<Button onClick={this.toggle} bsStyle="default" className="toggle">{this.state.visible ? "Hide" : "Show"}</Button>
				<Button onClick={this.add} bsStyle="default">Add</Button>
				<ul className="child-list" style={style}>
					{childNodes}
				</ul>
			</div>
		);
	}
});

module.exports = TreeNode;
