export function addList(listName) {
  return { type: 'ADD_LIST', listName };
}

export function openModal(name) {
  return { type: 'OPEN_MODAL', name: name };
}

export function closeModal(name) {
  return { type: 'CLOSE_MODAL', name: name };
}
