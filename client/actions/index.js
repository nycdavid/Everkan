// Modal actions
export function openModal(options = {}) {
  return { type: 'OPEN_MODAL', options };
}

export function closeModal(name) {
  return { type: 'CLOSE_MODAL', name: name };
}

export function closeAllModals() {
  return { type: 'CLOSE_ALL_MODALS' };
}

// List actions
export function saveList(list) {
  return { type: 'SAVE_LIST', list };
}

export function updateList(list) {
  return { type: 'UPDATE_LIST', list };
}

export function updateListCard(listId, card) {
  return { type: 'UPDATE_LIST_CARD', listId, card }
}

// ListCard actions
export function saveListCard(listId, card) {
  return { type: 'SAVE_LIST_CARD', listId: listId, card };
}
