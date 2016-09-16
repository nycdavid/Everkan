import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from '../../client/reducers';
import Board from '../../client/components/Board.jsx';
import listsFixture from '../fixtures/lists.json';
import ListFacade from '../../client/facades/ListFacade';
import Switchboard from '../utils/Switchboard';

const when = describe;

describe('<AddCardModal />', () => {
  let subject;
  let store;
  let unsubscribe;
  beforeEach(() => {
    Switchboard.init();
    const listFacades = listsFixture.map(list => new ListFacade(list));
    const initialState = {
      modals: [
        { name: 'AddList', visible: false },
        { name: 'ViewCard', visible: false, options: { card: { name : '' } } },
        { name: 'AddCard', visible: true, options: { list: listFacades[0] } },
      ],
      lists: listFacades
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

  when('When a User enters a Card name and clicks Add', () => {
    it('it saves the Card to the List', done => {
      subject.find('.card-name-input').get(0).value = 'Test Card #1';
      subject.find('.card-entry-form').simulate('submit');
      unsubscribe = store.subscribe(() => {
        expect(subject.html()).toContain('Test Card #1');
        done();
      });
    });

    it('it closes all open modals', done => {
      subject.find('.card-name-input').get(0).value = 'Test Card #1';
      subject.find('.card-entry-form').simulate('submit');
      unsubscribe = store.subscribe(() => {
        const modals = store.getState().modals;
        expect(modals.map(modal => modal.visible)).toEqual([false, false, false]);
        done();
      });
    });
  });
});
