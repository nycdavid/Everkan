import React from 'react';
import { connect } from 'react-redux';
import CloseModalControl from './CloseModalControl.jsx';

class BaseModal extends React.Component {
  outerMarkup() {
    const modalStyle = {
      display: this.props.visible ? 'block' : 'none',
    };

    return (
      <div
        className="everkan-modal-overlay"
        style={modalStyle}
      >
        <div className={`everkan-modal__content everkan-modal__content${this.classModifier()}`}>
          {this.markup()}
          <CloseModalControl modalName={this.modalName} />
        </div>
      </div>
    );
  }

  render() {
    return this.outerMarkup();
  }
}

export default BaseModal;
