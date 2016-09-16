import _ from 'lodash';

const initialState = [
];

export default function modals(state = initialState, action) {
  switch(action.type) {
    case 'SAVE_LIST':
      return state.map(modal => (Object.assign({}, modal, { visible: false })));
    case 'SAVE_LIST_CARD':
      return state.map(modal => (Object.assign({}, modal, { visible: false })));
    case 'OPEN_MODAL':
      return state.map(modal => (
        modal.name === action.options.name ?
          Object.assign({}, modal, { visible: true, options: action.options }) :
          modal
      ));
    case 'CLOSE_MODAL':
      return state.map(modal => (
        modal.name === action.name ?
          Object.assign({}, modal, { visible: false }) :
          modal
      ));
    case 'CLOSE_ALL_MODALS':
      return state.map(modal => (Object.assign({}, modal, { visible: false })));
    default:
      return state;
  }
}
