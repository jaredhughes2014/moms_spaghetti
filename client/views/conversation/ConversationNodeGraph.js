import React from 'react';
import ReactNodeGraph from 'react-node-graph';

/**
 *
 */
const ConversationNodeGraph = ({conversationNodes, onMove, onStartMove, onConnect}) =>
{
    const nodes = buildGraphNodes(conversationNodes);
    const connections = buildConnections(conversationNodes, nodes);

    const data = {nodes, connections};
    console.log(data);

    return (
        <ReactNodeGraph
            data={data}
            onNodeMove={onMove}
            onNodeStartMove={onStartMove}
            onNewConnector={onConnect}/>
    )
};

const buildGraphNodes = (nodes) =>
{
    let graphNodes = [];
    const columns = screen.width / 250;

    for (let i = 0; i < nodes.length; ++i) {
        graphNodes.push({
            nid: i + 1,
            type: nodes[i].name,
            x: (i % columns) * 250,
            y: ((i + 1) / columns) * 250,
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
                from_node: graphNodes.find(p => p.type === node.name).nid,
                from: node.name,
                to_node: graphNodes.find(p => p.type === target).nid,
                to: target,
            });
        }
    }

    return connections;
};

export default ConversationNodeGraph;
