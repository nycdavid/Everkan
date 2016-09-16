import axios from 'axios';
import ListFacade from '../facades/ListFacade';
import CardFacade from '../facades/CardFacade';
import {
  openModal,
  closeModal,
  closeAllModals,
  saveList,
  saveListCard,
  updateList,
  updateListCard
} from '../actions';

// Master Dispatcher
export default (dispatch) => {
  return function masterDispatcher(dispatch) {
    return Object.assign(
      {},
      // Modal
      {
        openModal: (modalName, options = {}) => {
          dispatch(openModal(modalName, options));
        },
        closeModal: (modalName) => {
          dispatch(closeModal(modalName))
        },
      },
      // List
      {
        saveList: (listName) => {
          axios.post('/lists', {
            name: listName,
          }).then(response => {
            const list = new ListFacade(response.data);
            dispatch(saveList(list));
          })
          .catch(handleError);
        },
        updateList: (id, list) => {
          axios.put(`/lists/${id}`, list)
          .then(response => {
            const list = new ListFacade(response.data);
            dispatch(updateList(list));
          })
          .catch(handleError);
        },
      },
      // Cards
      {
        saveCard: (listId, cardName) => {
          axios.post(`/lists/${listId}/cards`, {
            card: { name: cardName },
          })
          .then(response => {
            const card = new CardFacade(response.data);
            dispatch(saveListCard(listId, card));
          })
          .catch(handleError);
        },
        updateCard: (listId, cardObj) => {
          const card = new CardFacade(cardObj);
          axios.put(`/lists/${listId}/cards/${cardObj.id}`,
            { card }
          )
          .then(response => {
            const card = new CardFacade(response.data);
            dispatch(updateListCard(listId, card));
          })
          .catch(handleError);
        }
      }
    )
  }
}

function handleError(err) {
  console.log('ERROR:', err);
}
