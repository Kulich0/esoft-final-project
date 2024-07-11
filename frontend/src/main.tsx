import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import store from './reducer/store';
import { Provider } from 'react-redux';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}> 
    <App />
  </Provider>,
)
