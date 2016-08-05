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
        list.name === action.listName ?
          Object.assign({}, list, { cards: [{ name: action.name }, ...list.cards] }) :
          list
      ));
    default:
      return state;
  }
}
