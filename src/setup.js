import React from 'react'
import { Provider } from 'react-redux'
import App from './App'

import configureStore from './config/configureStore'
const store = configureStore()

export default setup = () => {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    )
}
