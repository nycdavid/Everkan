const initialState = [
];

export default function lists(state = initialState, action) {
  switch(action.type) {
    case 'SAVE_LIST':
      return [
        { name: action.name },
        ...state
      ];
    default:
      return state;
  }
}
