const initialState = [
  { name: 'Music Production' },
  { name: 'Entrepreneurship' },
  { name: 'Physical Fitness' },
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
