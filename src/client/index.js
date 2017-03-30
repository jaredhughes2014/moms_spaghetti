var ReactDOM = require('react-dom');
var React = require('react');
var Tree = require('./tree.js');
var TreeData = require('./treeData.js');
var Panel = require('react-bootstrap/lib/Panel');
/**
 * Let there be Tree
 */
ReactDOM.render(
  <Panel header={<h3>Customize your Tree</h3>} bsStyle="primary"><Tree node={TreeData.tree}/></Panel>,
  document.getElementById('app')
);