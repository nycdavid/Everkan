import React from 'react';
import axios from 'axios';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './reducers';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';

if (module.hot) {
  module.hot.accept();
}

axios.get('/lists')
  .then((response) => {
    const initialState = {
      modals: [
        { name: 'AddList', visible: false },
        { name: 'GetHelp', visible: false },
        { name: 'AddCard', visible: false, options: { listName: '' } },
      ],
      lists: response.data.map((response) => (
        { id: response._id, name: response.name, cards: response.cards }
      )),
    }
    const store = createStore(rootReducer, initialState);
    ReactDOM.render(
      <Provider store={store}>
      <App />
      </Provider>,
      document.getElementById('app')
    );   
  });
