// @flow
import { createStore } from 'redux';

export default (reducer: () => {}, state: {}) => {
    const store = createStore(reducer, state);
    const originalDispath = store.dispatch;
    store.dispatch = (action: {} | string) => {
        if (typeof action === 'string') {
            return originalDispath({ type: action });
        }

        return originalDispath(action);
    }

    return store;
}