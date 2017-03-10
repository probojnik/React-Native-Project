import { createStore, applyMiddleware } from 'redux'
import rootReducer from '../reducers'
import createLogger from 'redux-logger'
import thunk from 'redux-thunk'

const middleware = [ thunk ]

export default function configureStore () {
  console.log('process_env',process.env);
  if (process.env.NODE_ENV === 'development') {
    middleware.push(createLogger())
    require('../config/ReactotronConfig')
  }
  const store = createStore(rootReducer, applyMiddleware(...middleware))

  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require('../reducers/index').default
      store.replaceReducer(nextRootReducer)
    })
  }
  return store
}
