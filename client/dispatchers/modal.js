import { openModal, closeModal, closeAllModals } from '../actions';

export default function(dispatch) {
  return {
    openModal: function (modalName, options = {}) {
      dispatch(closeAllModals());
      dispatch(openModal(modalName, options));
    }
  }
}
