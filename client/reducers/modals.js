import _ from 'lodash';

const initialState = [
  { name: 'AddList', visible: false },
  { name: 'GetHelp', visible: false },
];

export default function modals(state = initialState, action) {
  switch(action.type) {
    case 'OPEN_MODAL':
      return state.map(modal => (
        modal.name === action.name ?
          Object.assign({}, modal, { visible: true }) :
          modal
      ));
    case 'CLOSE_MODAL':
      return state.map(modal => (
        modal.name === action.name ?
          Object.assign({}, modal, { visible: false }) :
          modal
      ));
    default:
      return state;
  }
}
