import React from 'react';
import axios from 'axios';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './reducers';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import ListFacade from './facades/ListFacade';

if (module.hot) {
  module.hot.accept();
}

axios.get('/lists')
  .then((response) => {
    const initialState = {
      modals: [
        { name: 'AddList', visible: false },
        { name: 'ViewCard', visible: false, options: { card: { name : '' } } },
        { name: 'AddCard', visible: false, options: { list: { name: '' } } },
      ],
      lists: response.data.map(list => (
        new ListFacade(list)
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
