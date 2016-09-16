import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from '../../client/reducers';
import Lists from '../../client/components/Lists.jsx';
import List from '../../client/components/List.jsx';
import AddListModal from '../../client/components/modals/AddListModal.jsx';
import AddCardModal from '../../client/components/modals/AddCardModal.jsx';
import ViewCardModal from '../../client/components/modals/ViewCardModal.jsx';
import listsFixture from '../fixtures/lists.json';
import ListFacade from '../../client/facades/ListFacade';

const when = describe;

describe('<Lists />', () => {
  let subject;
  let unsubscribe = function() {};
  let store;
  beforeEach(() => {
    const initialState = {
      modals: [
        { name: 'AddList', visible: false },
        { name: 'ViewCard', visible: false, options: { card: { name : '' } } },
        { name: 'AddCard', visible: false, options: { list: { name: '' } } },
      ],
      lists: listsFixture.map(list => new ListFacade(list))
    };
    store = createStore(rootReducer, initialState);
    subject = mount(
      <Provider store={store}>
        <Lists />
      </Provider>
    );
  });

  afterEach(() => {
    unsubscribe();
  });

  when('When a User loads the Lists component', () => {
    it('it displays all of the user\'s lists', () => {
      const lists = subject.find(List);

      expect(lists.length).toEqual(2);
    });
  });
});
