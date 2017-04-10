
import conversationEdit from './state/conversationEdit';
import conversations from './state/conversations';
import nodeEdit from './state/nodeEdit';

import {createStore, combineReducers, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {Provider} from 'react-redux';
import React from 'react';


// Here's where all of the separate reducer functions are combined into one
const reducer = combineReducers({
    conversationEdit: conversationEdit.reducer,
    conversations: conversations.reducer,
    nodeEdit: nodeEdit.reducer,
});

const sagaMiddleware = createSagaMiddleware();

/**
 * The provider makes sure the redux store we are creating to reach all
 * child objects
 */
const store = createStore(
    reducer,
    applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(conversations.saga);
sagaMiddleware.run(conversationEdit.saga);
sagaMiddleware.run(nodeEdit.saga);

/**
 * Insures that all children have access to the redux store
 */
const MomsSpaghettiProvider = ({children}) =>
{
    return (
        <Provider store={store}>
            {children}
        </Provider>
    );
};
export default MomsSpaghettiProvider;