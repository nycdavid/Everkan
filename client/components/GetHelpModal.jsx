import React from 'react';
import BaseModal from './BaseModal.jsx';

require('../stylesheets/modal.scss');

class GetHelpModal extends BaseModal {
  constructor(props) {
    super(props);
    this.markup = (
      <h1>If you need help, get help!</h1>
    );
  }

  render() {
    return this.outerMarkup();
  }
}

export default GetHelpModal;
