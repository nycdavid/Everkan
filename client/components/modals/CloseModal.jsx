import React from 'react';
import { connect } from 'react-redux';
import masterDispatcher from '../../dispatchers/master_dispatcher';

class CloseModalControl extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { modalName, closeModal } = this.props;

    return (
      <i
        onClick={() => { closeModal(modalName) }}
        className="everkan-modal__close fa fa-times"
      >
      </i>
    );
  }
}

export default connect(
  () => ({}),
  masterDispatcher()
)(CloseModalControl);
