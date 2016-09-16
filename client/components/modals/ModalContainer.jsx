import React from 'react';
import { connect } from 'react-redux';
import AddListModal from './AddListModal.jsx';
import AddCardModal from './AddCardModal.jsx';
import ViewCardModal from './ViewCardModal.jsx';
import masterDispatcher from '../../dispatchers/master_dispatcher';

class ModalContainer extends React.Component {
  render() {
    const { lists, modals } = this.props;
    return (
      <div>
        <AddListModal
          visible={getModal(modals, 'AddList').visible}
          options={getModal(modals, 'AddList').options} />
        <AddCardModal
          visible={getModal(modals, 'AddCard').visible}
          options={getModal(modals, 'AddCard').options} />
        <ViewCardModal
          visible={getModal(modals, 'ViewCard').visible}
          options={getModal(modals, 'ViewCard').options} />
      </div>
    )
  }
}

function getModal(modals, name) {
  return _.find(modals, (modal) => modal.name === name);
}

const ConnectedModalContainer = connect(
  state => ({
    modals: state.modals,
    lists: state.lists
  }),
  masterDispatcher()
)(ModalContainer);

export default ConnectedModalContainer
