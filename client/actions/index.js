import axios from 'axios';

// Modal actions
export function openModal(name, options = {}) {
  return { type: 'OPEN_MODAL', name: name, options };
}

export function closeModal(name) {
  return { type: 'CLOSE_MODAL', name: name };
}

// List actions
export function saveList(list) {
  return { type: 'SAVE_LIST', list };
}

// Card actions
export function updateList(list) {
  return { type: 'UPDATE_LIST', list }
}
