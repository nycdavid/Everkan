import React from 'react';
import _ from 'lodash';
import axios from 'axios';
import { connect } from 'react-redux';
import { openModal, closeModal, saveList, updateList } from '../actions';
import AddListModal from './modals/AddListModal.jsx';
import AddCardModal from './modals/AddCardModal.jsx';
import ViewCardModal from './modals/ViewCardModal.jsx';
import Lists from './Lists.jsx';

require('../stylesheets/board.scss');

class Board extends React.Component {
  render() {
    const { lists, modals, onOpenModal, onCloseModal, onSaveList, onSaveCardToList } = this.props;
    return (
      <div className="board">
        <AddListModal 
          visible={getModalVisibility(modals, 'AddList')} 
          onCloseModal={() => { onCloseModal('AddList') }}
          onSaveList={onSaveList}
        />
        <AddCardModal
          visible={getModalVisibility(modals, 'AddCard')}
          onCloseModal={() => { onCloseModal('AddCard') }}
          saveCardToList={onSaveCardToList}
          options={getModalOptions(modals, 'AddCard')}
        />
        <ViewCardModal
          visible={getModalVisibility(modals, 'ViewCard')} 
          onCloseModal={() => { onCloseModal('ViewCard') }}
          options={getModalOptions(modals, 'ViewCard')}
        />
        <button 
          className="btn btn-default" 
          onClick={() => { onOpenModal('AddList') }}
        >
          Add a list...
        </button>
        <Lists lists={lists} />
      </div>
    );
  }
}

function getModalVisibility(modals, name) {
  return _.find(modals, (modal) => modal.name === name)
    .visible;
}

function getModalOptions(modals, name) {
  const foo = _.find(modals, (modal) => modal.name === name)
    .options;
  return foo;
}

function mapStateToProps(state) {
  return {
    modals: state.modals,
    lists: state.lists,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onOpenModal: (modalName) => {
      dispatch(openModal(modalName));
    },
    onCloseModal: (modalName) => {
      dispatch(closeModal(modalName));
    },
    onSaveList: (listName) => {
      axios.post('/lists', {
        name: listName
      }).then((response) => {
        dispatch(saveList(response.data));
      }).catch((error) => {
        console.log('Error saving:', error);
      });
    },
    onSaveCardToList: (cardName, listId) => {
      axios.put(`/lists/${listId}`, {
        cards: [{ name: cardName }],
      }).then((response) => {
        dispatch(updateList(response.data));
      });
    }
  }
}

const ConnectedBoard = connect(
  mapStateToProps,
  mapDispatchToProps
)(Board);


export default ConnectedBoard;
