var React = require('react');
var TreeNode = require('./treeNode.js');

var Tree = React.createClass({
  getInitialState: function(){
    return {
      tree: this.props.node,
      id: 6
    }
  },
  get_node_by_id: function(node, id){
      if(node.tree_id == id){
            return node;
      } else if (node.childNodes != null){
            var result = null;
            for(var i = 0; result == null && i < node.childNodes.length; i++){
                result = this.get_node_by_id(node.childNodes[i], id);
            }
            return result;
      }
      return null;
  },
  get_tree_id: function(){
    var newId = this.state.id + 1;
    this.setState({id: newId});
    return newId;
  },
  add: function(id){
    var updatedTree = Object.assign({}, this.state.tree);
      var node = this.get_node_by_id(updatedTree, id);
      if(node.childNodes != null){
        node.childNodes.push({title: null, tree_id: this.get_tree_id()});
      } else {
        node.childNodes = [{title: null, tree_id: this.get_tree_id()}];
      }
      this.setState({tree: updatedTree});
    },
    edit: function(id, value){
      var updatedTree = Object.assign({}, this.state.tree);
      var node = this.get_node_by_id(updatedTree, id);
      node.title = value;
      this.setState({tree: updatedTree});
    },
  render: function(){
    return (
      <div>
        <TreeNode node={this.state.tree} add={this.add} edit={this.edit}/>
        <p>{JSON.stringify(this.state.tree)}</p>
      </div>
    );
  }
});
module.exports = Tree;