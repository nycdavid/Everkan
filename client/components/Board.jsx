import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { openModal, closeModal, saveList } from '../actions';
import AddListModal from './AddListModal.jsx';
import GetHelpModal from './GetHelpModal.jsx';
import Lists from './Lists.jsx';

require('../stylesheets/board.scss');

class Board extends React.Component {
  render() {
    const { lists, modals, onOpenModal, onCloseModal, onSaveList } = this.props;
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

function mapStateToProps(state) {
  console.log(state);
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
      dispatch(saveList(listName));
    },
  }
}

const ConnectedBoard = connect(
  mapStateToProps,
  mapDispatchToProps
)(Board);


export default ConnectedBoard;
