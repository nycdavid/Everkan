import React from 'react';
import BaseModal from './BaseModal.jsx';

class ViewCardModal extends BaseModal {
  markup() {
    return (
      <h1>{this.props.options.name}</h1>
    );
  }
}

export default ViewCardModal;
