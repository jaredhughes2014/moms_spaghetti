
import conversationEdit from './state2/conversationEdit';
import conversations from './state2/conversations';
import nodeEdit from './state2/nodeEdit';

import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import React from 'react';


// Here's where all of the separate reducer functions are combined into one
const reducer = combineReducers({
    conversationEdit: conversationEdit.reducer,
    conversations: conversations.reducer,
    nodeEdit: nodeEdit.reducer,
});

/**
 * The provider makes sure the redux store we are creating to reach all
 * child objects
 */
const store = createStore(reducer);
const MomsSpaghettiProvider = ({children}) =>
{
    return (
        <Provider store={store}>
            {children}
        </Provider>
    );
};
export default MomsSpaghettiProvider;