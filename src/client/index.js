var ReactDOM = require('react-dom');
var React = require('react');
var Tree = require('./tree.js');
var TreeData = require('./treeData.js');
var Panel = require('react-bootstrap/lib/Panel');
var ReactNodeGraph = require('react-node-graph');
var Button = require('react-bootstrap/lib/Button');

/**
 * Let there be Tree
 */
var node_id = 111;
var exampleGraph = {
  "nodes":[
	{"nid":1,"type":"Oregon Trail","x":50,"y":351,"fields":{"in":[{"name":"oregon"},{"name":"trail"}],"out":[{"name":"Connect"}]}},
	{"nid":2,"type":"Cross the river","x":549,"y":478,"fields":{"in":[{"name":"cross"},{"name":"river"}],"out":[{"name":"Connect"}]}},
	{"nid":23,"type":"Go through the mountains","x":1216,"y":217,"fields":{"in":[{"name":"go"},{"name":"through"},{"name":"mountains"}],"out":[{"name":"Connect"}]}},
	{"nid":35,"type":"Merge","x":948,"y":217,"fields":{"in":[{"name":"in0"},{"name":"in1"},{"name":"in2"},{"name":"in3"},{"name":"in4"},{"name":"in5"}],"out":[{"name":"out"}]}},
	{"nid":45,"type":"Color","x":950,"y":484,"fields":{"in":[{"name":"rgb"},{"name":"r"},{"name":"g"},{"name":"b"}],"out":[{"name":"rgb"},{"name":"r"},{"name":"g"},{"name":"b"}]}},
	{"nid":55,"type":"Vector3","x":279,"y":503,"fields":{"in":[{"name":"xyz"},{"name":"x"},{"name":"y"},{"name":"z"}],"out":[{"name":"xyz"},{"name":"x"},{"name":"y"},{"name":"z"}]}},
	{"nid":65,"type":"ThreeMesh","x":707,"y":192,"fields":{"in":[{"name":"children"},{"name":"position"},{"name":"rotation"},{"name":"scale"},{"name":"doubleSided"},{"name":"visible"},{"name":"castShadow"},{"name":"receiveShadow"},{"name":"geometry"},{"name":"material"},{"name":"overdraw"}],"out":[{"name":"out"}]}},
	{"nid":79,"type":"Timer","x":89,"y":82,"fields":{"in":[{"name":"reset"},{"name":"pause"},{"name":"max"}],"out":[{"name":"out"}]}},
	{"nid":84,"type":"MathMult","x":284,"y":82,"fields":{"in":[{"name":"in"},{"name":"factor"}],"out":[{"name":"out"}]}},
	{"nid":89,"type":"Vector3","x":486,"y":188,"fields":{"in":[{"name":"xyz"},{"name":"x"},{"name":"y"},{"name":"z"}],"out":[{"name":"xyz"},{"name":"x"},{"name":"y"},{"name":"z"}]}}
  ],
  "connections":[
	{"from_node":1,"from":"Connect","to_node":2,"to":"cross"},
	{"from_node":1,"from":"Connect","to_node":23,"to":"go"},
	{"from_node":35,"from":"out","to_node":23,"to":"children"},
	{"from_node":65,"from":"out","to_node":35,"to":"in0"},
	{"from_node":79,"from":"out","to_node":84,"to":"in"},
	{"from_node":89,"from":"xyz","to_node":65,"to":"rotation"},
	{"from_node":84,"from":"out","to_node":89,"to":"y"}
  ]
};
var onNewConnector = function(fromNode,fromPin,toNode,toPin) {
   let conn = exampleGraph.connections.push({
	  "from_node" : fromNode,
	  "from" : fromPin,
	  "to_node" : toNode,
	  "to" : toPin
	});
  }

var onNodeMove = function(nid, pos) { 
	console.log('end move : ' + nid, pos)
  }

var onNodeStartMove = function(nid) { 
	console.log('start move : ' + nid)
  }
var add = function(){
	exampleGraph.nodes.push({
		nid: ++node_id,
		type: "New Node - Click to Edit",
		x: 50,
		y: 50,
		fields: {
			in: [],
			out: []
		}
	});
}

// ReactDOM.render(
//   <Panel header={<h3>Customize your Tree</h3>} bsStyle="primary">
//   	<Tree node={TreeData.tree}/>
//   	<ReactNodeGraph 
//             data={exampleGraph} 
//             onNodeMove={(nid, pos)=>this.onNodeMove(nid, pos)}
//             onNodeStartMove={(nid)=>this.onNodeStartMove(nid)}
//             onNewConnector={(n1,o,n2,i)=>this.onNewConnector(n1,o,n2,i)} />
//   </Panel>,
//   document.getElementById('app')
// );
ReactDOM.render(
	<div>
		<Button onClick={add} bsStyle="default">Add Node</Button>
		<ReactNodeGraph 
			data={exampleGraph} 
			onNodeMove={(nid, pos)=>onNodeMove(nid, pos)}
			onNodeStartMove={(nid)=>onNodeStartMove(nid)}
			onNewConnector={(n1,o,n2,i)=>onNewConnector(n1,o,n2,i)} />
	</div>,
  document.getElementById('app')
);