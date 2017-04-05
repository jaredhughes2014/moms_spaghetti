
const path = require("path");

/**
 * Easy way to extend additional paths from a root path
 */
const extendPaths = (root, endpoints) =>
{
    let keys = Object.keys(endpoints);
    let modified = {};

    for (let i = 0; i < keys.length; ++i) {
        let key = keys[i];
        modified[key] = path.join(root, endpoints[key]);
    }

    return modified;
};

const paths = {
    index: '/',
    conversationRoot: '/conversations',
    conversations: extendPaths('/conversations', {
        edit: 'edit',
    }),
};
module.exports = paths;