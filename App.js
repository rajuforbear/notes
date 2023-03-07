import { View, Text } from 'react-native'
import React from 'react'

import { Provider } from 'react-redux'
import myStote from './src/ReduxTollkit/MyStore'
import myStore from './src/authentication/ReduxToolkit/store'
import MyNavigation from './src/authentication/Navigation'

const App = () => {
  return (
      <Provider store={myStore}>
        <MyNavigation/>
      </Provider>
  )
}

export default App