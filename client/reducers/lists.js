const initialState = [
];

export default function lists(state = initialState, action) {
  switch(action.type) {
    case 'SAVE_LIST':
      return [
        action.list,
        ...state
      ];
    case 'UPDATE_LIST':
      return state.map(list => (
        list.name === action.list.name ?
          Object.assign({}, list, { cards: [{ name: action.list.cards[0].name }, ...list.cards] }) :
          list
      ));
    default:
      return state;
  }
}
