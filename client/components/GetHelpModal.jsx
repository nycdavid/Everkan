import React from 'react';
import BaseModal from './BaseModal.jsx';

require('../stylesheets/modal.scss');

class GetHelpModal extends BaseModal {
  markup() {
    return (
      <h1>If you need help, get help!</h1>
    );
  }
}

export default GetHelpModal;
