
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
    conversationRoot: '/conversations',
    conversations: extendPaths('/conversations/', {
        get: 'get',
        add: 'add',
        save: 'save',
    }),
};
module.exports = paths;