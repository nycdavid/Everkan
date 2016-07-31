import React from 'react';
import { renderToString } from 'react-dom/server';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from '../../client/reducers';
import App from '../../client/components/App';

export default {
  handleRender: (req, res) => {
    const store = createStore(rootReducer);
    const html = renderToString(
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}
