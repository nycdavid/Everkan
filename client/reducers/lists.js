const initialState = [
];

export default function lists(state = initialState, action) {
  switch(action.type) {
    case 'SAVE_LIST':
      return [
        action.list,
        ...state
      ];
    case 'SAVE_LIST_CARD':
      return state.map(list => (
        list.id === action.listId ?
          Object.assign({}, list, { cards: [action.card, ...list.cards] }) :
          list
      ));
    case 'UPDATE_LIST':
      return state.map(list => (
        list.name === action.list.name ?
          Object.assign({}, list, { cards: [{ name: action.list.cards[0].name }, ...list.cards] }) :
          list
      ));
    case 'UPDATE_LIST_CARD':
      const updatedList = _.find(state, list => list.id === action.listId);
      const updatedCards = updatedList.cards.map(card => (
        card.id === action.card.id ? Object.assign({}, card, action.card) :
        card
      ))
      const foo = state.map(list => (
        list.id === action.listId ?
          Object.assign({}, list, { cards: updatedCards }) :
          list
      ));
      return foo;
    default:
      return state;
  }
}
