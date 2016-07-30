// Modal actions
export function openModal(name, options = {}) {
  return { type: 'OPEN_MODAL', name: name, options };
}

export function closeModal(name) {
  return { type: 'CLOSE_MODAL', name: name };
}

// List actions
export function saveList(name) {
  return { type: 'SAVE_LIST', name: name };
}

// Card actions

export function saveCardToList(name) {
  return { type: 'SAVE_LIST_CARD', name: name };
}
