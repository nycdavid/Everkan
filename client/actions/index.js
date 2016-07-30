// Modal actions
export function openModal(name) {
  return { type: 'OPEN_MODAL', name: name };
}

export function closeModal(name) {
  return { type: 'CLOSE_MODAL', name: name };
}

// List actions
export function saveList(name) {
  return { type: 'SAVE_LIST', name: name };
}
