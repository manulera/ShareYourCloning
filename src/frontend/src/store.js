import {
  createStore, combineReducers, applyMiddleware, compose,
} from 'redux';
import { tg_modalState } from 'teselagen-react-components';
import {
  vectorEditorReducer as VectorEditor,
  vectorEditorMiddleware,
} from 'open-vector-editor';
import thunk from 'redux-thunk';
import { reducer as form } from 'redux-form';

const composeEnhancer = (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      actionsBlacklist: ['HOVEREDANNOTATIONUPDATE', 'HOVEREDANNOTATIONCLEAR'],
      // actionSanitizer,
      latency: 1000,
      name: 'openVE',
    }))
  || compose;

const store = createStore(
  combineReducers({
    form,
    tg_modalState,
    VectorEditor: VectorEditor(),
  }),
  undefined,
  compose(
    // your store should be redux-thunk connected for the VectorEditor component to work
    applyMiddleware(thunk, vectorEditorMiddleware),
  ),
);

export default store;
