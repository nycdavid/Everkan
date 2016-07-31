import React from 'react';
import _ from 'lodash';
import axios from 'axios';
import { connect } from 'react-redux';
import { openModal, closeModal, saveList, saveCardToList } from '../actions';
import AddListModal from './AddListModal.jsx';
import GetHelpModal from './GetHelpModal.jsx';
import AddCardModal from './AddCardModal.jsx';
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
        <GetHelpModal
          visible={getModalVisibility(modals, 'GetHelp')}
          onCloseModal={() => { onCloseModal('GetHelp') }}
        />
        <AddCardModal
          visible={getModalVisibility(modals, 'AddCard')}
          onCloseModal={() => { onCloseModal('AddCard') }}
          saveCardToList={onSaveCardToList}
          options={getModalOptions(modals, 'AddCard')}
        />
        <button 
          className="btn btn-default" 
          onClick={() => { onOpenModal('AddList') }}
        >
          Add a list...
        </button>
        <button
          className="btn btn-default"
          onClick={() => { onOpenModal('GetHelp') }}
        >
          Get Help
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
        dispatch(saveList(response.data.name));
      }).catch((error) => {
        console.log('Error saving:', error);
      });
    },
    onSaveCardToList: (cardName, listName) => {
      dispatch(saveCardToList(cardName, listName));
    }
  }
}

const ConnectedBoard = connect(
  mapStateToProps,
  mapDispatchToProps
)(Board);


export default ConnectedBoard;
