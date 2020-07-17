import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from './reducers';

/*const loggerMiddleware = createLogger();*/

const initialState = {};

// const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  (applyMiddleware(thunk,logger)),
);

export default store;
