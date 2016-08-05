import React from 'react';
import { connect } from 'react-redux';
import mapDispatchToProps from '../../dispatchers/map_dispatch_to_props';

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
  function() { return {}; },
  mapDispatchToProps()
)(CloseModalControl);
