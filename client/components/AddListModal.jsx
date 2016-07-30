import React from 'react';
import { connect } from 'react-redux';
import BaseModal from './BaseModal.jsx';

require('../stylesheets/modal.scss');

class AddListModal extends BaseModal {
  constructor(props) {
    super(props);
    let input;

    this.markup = (
      <div>
        <form onSubmit={(e) => {
          e.preventDefault();
          console.log('form submitted!')
          this.props.onSaveList(input.value);
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

  render() {
    return this.outerMarkup();
  }
}

export default AddListModal;
