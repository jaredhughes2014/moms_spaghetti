var ReactDOM = require('react-dom');
var React = require('react');
var Tree = require('./tree.js');
var TreeData = require('./treeData.js');

/**
 * Let there be Tree
 */
ReactDOM.render(
  <Tree node={TreeData.tree}/>,
  document.getElementById('app')
);