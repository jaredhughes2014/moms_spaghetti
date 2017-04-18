
const url = require("url");

/**
 * Easy way to extend additional paths from a root path
 */
const extendPaths = (root, endpoints) =>
{
    let keys = Object.keys(endpoints);
    let modified = {};

    for (let i = 0; i < keys.length; ++i) {
        let key = keys[i];
        modified[key] = root + endpoints[key];
    }

    return modified;
};

const paths = {
    index: '/',
    conversations: extendPaths('/conversations/', {
        all: 'all',
        add: 'add',
        remove: 'remove',
        get: 'get',
    }),

    conversation: extendPaths('/conversation/edit/', {
        updateName: 'updateName',
        addNode: 'addNode',
        removeNode: 'removeNode',
        addTrigger: 'addTrigger',
        removeTrigger: 'removeTrigger',
        addVariable: 'addVariable',
        removeVariable: 'removeVariable'
    }),

    node: extendPaths('/node/edit/', {
        updateName: 'updateName',
        updateText: 'updateText',
        get: 'getNode',
        addPrompt: 'addPrompt',
        removePrompt: 'removePrompt',
        updatePrompt: 'addPrompt',
        addKeyWord: 'addTrigger',
        removeKeyWord: 'removeKeyWord',
        addTarget: 'addTarget',
        removeTarget: 'removeTarget',
        updatePosition: 'updatePosition',
    }),
};
module.exports = paths;