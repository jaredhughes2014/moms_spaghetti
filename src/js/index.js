var ReactDOM = require('react-dom');
var React = require('react');
var Tree = require('./tree.js');
 
var data = {
  	title: "Oregon Trail",
  	childNodes: [
		{title: "Cross the river"},
		{title: "Go through the mountains", childNodes: [
	  		{title: "Cholera", childNodes: [
				{title: "Dead"}
	  		]},
	  		{title: "Freeze to death"}
		]}
  	]
};
 
ReactDOM.render(
  <Tree node={data}/>,
  document.getElementById('app')
);