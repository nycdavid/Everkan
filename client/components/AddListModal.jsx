import React from 'react';
import BaseModal from './BaseModal.jsx';

require('../stylesheets/modal.scss');

class AddListModal extends BaseModal {
  constructor(props) {
    super(props);
    this.markup = (
      <div>
        <div>
          <label htmlFor="list-name">List name:</label>
          <input type="text" />
        </div>
        <div>
          <button className="btn btn-default">Save list</button>
        </div>
      </div>
    );
  }
  
  render() {
    return this.outerMarkup();
  }
}

export default AddListModal;
