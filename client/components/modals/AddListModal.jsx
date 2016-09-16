import React from 'react';
import BaseModal from './BaseModal.jsx';
import CloseModal from './CloseModal.jsx';
import { connect } from 'react-redux';
import masterDispatcher from '../../dispatchers/master_dispatcher';

require('../../stylesheets/modal.scss');

class AddListModal extends BaseModal {
  constructor(props) {
    super(props);
    this.modalName = 'AddList';
  }

  classModifier() {
    return '--add-list';
  }

  markup() {
    let input;
    const { saveList } = this.props;
    return (
      <div>
        <form
          className="list-entry-form"
          onSubmit={e => {
          e.preventDefault();
          saveList(input.value);
          input.value = '';
        }}>
          <div>
            <label htmlFor="list-name">List name:</label>
            <input
              className="list-name-input"
              type="text"
              ref={node => (
                input = node
              )}
            />
          </div>
          <div>
            <button
              type="submit"
              className="btn btn-default btn-save-list"
            >
              Save list
            </button>
          </div>
        </form>
        <CloseModal modalName={this.modalName} />
      </div>
    );
  }
}

export default connect(
  () => ({}),
  masterDispatcher()
)(AddListModal);
