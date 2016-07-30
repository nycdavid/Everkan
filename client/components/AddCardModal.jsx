import React from 'react';
import BaseModal from './BaseModal.jsx';

class AddCardModal extends BaseModal {
  render() {
    this.markup = (
      <div>
        <form action="">
          <div>
            <h3>Add a card to {this.props.options.listName}</h3>
            <label htmlFor="Card name">Card name:</label>
            <input type="text" />
          </div>
          <div>
            <button className="btn btn-default">Save Card..</button>
          </div>
        </form>
      </div>
    )
    return this.outerMarkup();
  }
}

export default AddCardModal;
