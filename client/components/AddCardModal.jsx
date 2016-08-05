import React from 'react';
import BaseModal from './BaseModal.jsx';

class AddCardModal extends BaseModal {
  markup() {
    let input;

    return (
      <div>
        <form
          onSubmit={e => {
            e.preventDefault();
            this.props.saveCardToList(input.value, this.props.options.listId);
            input.value = '';
          }}
        >
          <div>
            <h3>Add a card to {this.props.options.listName}</h3>
            <label htmlFor="Card name">Card name:</label>
            <input 
              ref={node => {
                input = node;
              }}
              type="text" 
            />
          </div>
          <div>
            <button 
              className="btn btn-default"
            >
              Save Card..
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default AddCardModal;
