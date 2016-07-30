const initialState = [
  { name: 'Music Production', cards: [] },
  { name: 'Entrepreneurship', cards: [] },
  { name: 'Physical Fitness', cards: [] },
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
