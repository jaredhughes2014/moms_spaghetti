var ReactDOM = require('react-dom');
var React = require('react');
var Tree = require('./tree.js');
var TreeData = require('./treeData.js');
 
ReactDOM.render(
  <Tree node={TreeData.tree}/>,
  document.getElementById('app')
);