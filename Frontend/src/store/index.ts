import { RootState } from './reducers/index';
import {applyMiddleware, bindActionCreators, createStore, Store} from 'redux';
import { rootReducer } from './reducers';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { useMemo } from 'react';
import actionsCreators from './actions-creators';
import thunk from 'redux-thunk';

// create a makeStore function
export const store: Store<RootState> = createStore(rootReducer, applyMiddleware(thunk));
// Infer the `RootState` and `AppDispatch` types from the store itself
export { type RootState };
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useTypedDistah: () => AppDispatch = useDispatch;

export const useActions = () => {
    const dispatch = useTypedDistah();
    return useMemo(() => bindActionCreators(actionsCreators, dispatch), [dispatch]);
};

export { selectors } from './selectors';
export { thunkCreators } from './thunk-creators';
