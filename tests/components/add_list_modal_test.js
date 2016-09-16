import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from '../../client/reducers';
import List from '../../client/components/List.jsx';
import Board from '../../client/components/Board.jsx';
import listsFixture from '../fixtures/lists.json';
import ListFacade from '../../client/facades/ListFacade';
import Switchboard from '../utils/Switchboard';

const when = describe;

describe('<AddListModal />', () => {
  let subject;
  let store;
  let unsubscribe;

  beforeEach(() => {
    Switchboard.init();
    const initialState = {
      modals: [
        { name: 'AddList', visible: true },
        { name: 'ViewCard', visible: false, options: { card: { name : '' } } },
        { name: 'AddCard', visible: false, options: { list: { name: '' } } },
      ],
      lists: listsFixture.map(list => new ListFacade(list))
    };
    store = createStore(rootReducer, initialState);
    subject = mount(
      <Provider store={store}>
        <Board />
      </Provider>
    );
  });

  afterEach(() => {
    unsubscribe();
  });

  when('When a User enters a List name and clicks Add', () => {
    it('it saves the List', done => {
      subject.find('.list-name-input').get(0).value = 'List #3';
      subject.find('.list-entry-form').simulate('submit');
      unsubscribe = store.subscribe(() => {
        expect(subject.find(List).length).toEqual(3);
        done();
      });
    });

    it('it closes all open modals', done => {
      subject.find('.list-name-input').get(0).value = 'Test Card #1';
      subject.find('.list-entry-form').simulate('submit');
      unsubscribe = store.subscribe(() => {
        const modals = store.getState().modals;
        expect(modals.map(modal => modal.visible)).toEqual([false, false, false]);
        done();
      });
    });
  });
});
