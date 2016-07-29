import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { openModal, closeModal } from '../actions';
import AddListModal from './AddListModal.jsx';
import GetHelpModal from './GetHelpModal.jsx';

require('../stylesheets/board.scss');

class Board extends React.Component {
  render() {
    const { modals, onOpenModal, onCloseModal } = this.props;
    return (
      <div className="board">
        <AddListModal 
          visible={getModalVisibility(modals, 'AddList')} 
          onCloseModal={() => { onCloseModal('AddList') }}
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
      </div>
    );
  }
}

function getModalVisibility(modals, name) {
  console.log(modals);
  return _.find(modals, (modal) => modal.name === name)
    .visible;
}

function mapStateToProps(state) {
  return {
    modals: state.modals,
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
  }
}

const ConnectedBoard = connect(
  mapStateToProps,
  mapDispatchToProps
)(Board);


export default ConnectedBoard;
