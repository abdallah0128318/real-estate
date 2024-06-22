import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { store, persistor } from './redux/store.js'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Here is provider for redux storage to be available through all application components */}
    <Provider store={store}>
      {/* 
          PersistGate is used to delay the app UI render until the 'persistReducer' function 
          retrieve the data from localStorage back to redux store.

          'loading' prop may be null or take a component. 
          For example spinner component or something like that to be rendered until 
          the user data is fetched from the localStorage back to redux store.
      */}
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
)
