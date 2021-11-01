import {createStore, combineReducers, compose, applyMiddleware} from 'redux';
import thunck from 'redux-thunk';

const rootReducer = combineReducers({
    
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function generateStore() {
    const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunck)))
    return store;
}