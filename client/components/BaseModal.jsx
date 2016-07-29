import React from 'react';

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
        <div className="everkan-modal__content">
          {this.markup}
          <div onClick={this.props.onCloseModal} className="everkan-modal__close">X</div>
        </div>
      </div>
    );
  }

  render() {
    return null;
  }
}

export default BaseModal;
