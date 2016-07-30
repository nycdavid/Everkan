import React from 'react';
import BaseModal from './BaseModal.jsx';

require('../stylesheets/modal.scss');

class AddListModal extends BaseModal {
  markup() {
    let input;
    return (<div>
      <form onSubmit={e => {
        e.preventDefault();
        this.props.onSaveList(input.value);
        input.value = '';
      }}>
      <div>
        <label htmlFor="list-name">List name:</label>
        <input 
          type="text" 
          ref={node => (
            input = node
          )}
        />
      </div>
      <div>
        <button 
          type="submit"
          className="btn btn-default"
        >
          Save list
        </button>
      </div>
    </form>
  </div>
    );
  }
}

export default AddListModal;
