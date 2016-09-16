import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from '../../client/reducers';
import Board from '../../client/components/Board.jsx';
import AddListModal from '../../client/components/modals/AddListModal.jsx';
import AddCardModal from '../../client/components/modals/AddCardModal.jsx';
import ViewCardModal from '../../client/components/modals/ViewCardModal.jsx';
import listsFixture from '../fixtures/lists.json';
import ListFacade from '../../client/facades/ListFacade';

const when = describe;

describe('<Board />', () => {
  let subject;
  beforeEach(() => {
    const initialState = {
      modals: [
        { name: 'AddList', visible: false },
        { name: 'ViewCard', visible: false, options: { card: { name : '' } } },
        { name: 'AddCard', visible: false, options: { list: { name: '' } } },
      ],
      lists: listsFixture.map(list => new ListFacade(list))
    };
    const store = createStore(rootReducer, initialState);
    subject = mount(
      <Provider store={store}>
        <Board />
      </Provider>
    );
  });

  when('When a User first loads the page', () => {
    it('it does not display any modals', () => {
      [AddListModal, ViewCardModal, AddCardModal].forEach(modal => {
        expect(subject.find(modal).props().visible).toEqual(false);
      });
    });
  });

  when('When a User clicks the Add List button', () => {
    it('it opens an Add List Modal', () => {
      subject.find('.btn-add-list').simulate('click');

      expect(subject.find(AddListModal).props().visible).toEqual(true);
    });
  });

  when('When a User clicks the Add Card button', () => {
    it('it opens an Add Card Modal', () => {
      subject.find('.list__add-card').first().simulate('click');

      expect(subject.find(AddCardModal).props().visible).toEqual(true);
    });
  });
});
