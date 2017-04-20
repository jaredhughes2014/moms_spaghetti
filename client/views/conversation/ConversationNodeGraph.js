import React from 'react';
import ReactNodeGraph from 'react-node-graph';

let graphData = null;

/**
 *
 */
const ConversationNodeGraph = ({conversationNodes, onMove, onStartMove, onConnect}) =>
{
    const nodes = buildGraphNodes(conversationNodes);
    const connections = buildConnections(conversationNodes, nodes);

    if (graphData) {
        graphData.nodes.splice(0, graphData.nodes.length);
        graphData.connections.splice(0, graphData.connections.length);

        for (let i = 0; i < nodes.length; ++i) {
            graphData.nodes.push(nodes[i]);
        }
        for (let i = 0; i < connections.length; ++i) {
            graphData.connections.push(connections[i]);
        }
    }
    else {
        graphData = {nodes, connections};
    }

    return (
        <ReactNodeGraph
            data={graphData}
            onNodeMove={onMove}
            onNodeStartMove={onStartMove}
            onNewConnector={onConnect}/>
    )
};

const buildGraphNodes = (nodes) =>
{
    let graphNodes = [];

    for (let i = 0; i < nodes.length; ++i) {
        graphNodes.push({
            nid: nodes[i].name,
            type: nodes[i].name,
            x: nodes[i].x,
            y: nodes[i].y,
            fields: {
                in: [{name: nodes[i].name}],
                out: [{name: nodes[i].name}]
            }
        });
    }

    return graphNodes;
};

const buildConnections = (nodes, graphNodes) =>
{
    let connections = [];

    for (let i = 0; i < nodes.length; ++i) {
        let node = nodes[i];

        for (let j = 0; j < node.targets.length; ++j) {
            let target = node.targets[j];

            connections.push({
                from_node: graphNodes.find(p => p.nid === node.name).nid,
                from: node.name,
                to_node: graphNodes.find(p => p.nid === target).nid,
                to: target,
            });
        }
    }

    return connections;
};

export default ConversationNodeGraph;
