# TastyBook

## Implement Redux in Next.js project
1. install npm package: `redux` `redux-thunk` `redux-devtools-extension` `react-redux` `next-redux-wrapper`
2. new directory: `/lib/redux/{actions/, constants/, reducers/, store.js}`

`/lib/redux/store.js`
```javascript
import {createStore, applyMiddleware} from 'redux';
import {HYDRATE, createWrapper} from 'next-redux-wrapper'
import thunkMiddleware from 'redux-thunk'
// hydration is a process of filling an object with some data.
const bindMiddleware = (middleware) => {
    if (process.env.NODE_ENV !== 'production') {
        const {composeWithDevTools} = require('redux-devtools-extension');
        return composeWithDevTools(applyMiddleware(...middleware));
    }
    return applyMiddleware(...middleware);
}

const reducer = (state, action) => {
  if (action.type === HYDRATE) {
      const nextState = {
          ...state,
          ...action.payload
      };
      return nextState;
  } else {
      return reducers(state, action);
  }
};

const initStore = () => {
    return createStore(reducer, bindMiddleware([thunkMiddleware]));
};

export const wrapper = createWrapper(initStore);
```

`/lib/reducers/reducers.js`
```javascript
import { combineReducers } from 'redux';

const reducer = combineReducers({
    
});

export default reducer;
```

`src/app.js`
```javascript
import {wrapper} from '../redux/store'

function MyApp({Component, pageProps}) {
    return <Component {...pageProps} />
};

export default wrapper.withRedux(MyApp);
```
