import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from '../../client/reducers';
import Lists from '../../client/components/Lists.jsx';
import List from '../../client/components/List.jsx';
import Board from '../../client/components/Board.jsx';
import AddListModal from '../../client/components/modals/AddListModal.jsx';
import AddCardModal from '../../client/components/modals/AddCardModal.jsx';
import ViewCardModal from '../../client/components/modals/ViewCardModal.jsx';
import listsFixture from '../fixtures/lists.json';
import ListFacade from '../../client/facades/ListFacade';
import Switchboard from '../utils/Switchboard';

const when = describe;

describe('<ViewCardModal />', () => {
  let subject;
  let store;
  let unsubscribe;

  beforeEach(() => {
    Switchboard.init();
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
        <Board />
      </Provider>
    );
  });

  when('When a User clicks open a card', () => {
    it('it shows the User the title of the card', () => {
      subject.find('.cards__card').first().simulate('click');

      expect(subject.find(ViewCardModal).props().visible).toEqual(true);
      expect(subject.find(ViewCardModal).find('.card-name').text()).toEqual('Card #1');
    });
  });

  when('When a User clicks the X', () => {
    beforeEach(() => {
      subject.find('.cards__card').first().simulate('click');
    });

    it('it closes the view card modal', () => {
      expect(subject.find(ViewCardModal).props().visible).toEqual(true);
      subject.find(ViewCardModal).find('.everkan-modal__close').simulate('click');

      expect(subject.find(ViewCardModal).props().visible).toEqual(false);
    });
  });

  when('When a User clicks the Card content', () => {
    it('it allows them to edit the card\'s content', () => {
      // TODO
    });
  });
});
