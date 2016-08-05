import React from 'react';
import BaseModal from './BaseModal.jsx';
import CloseModal from './CloseModalControl.jsx';
import { connect } from 'react-redux';
import mapDispatchToProps from '../../dispatchers/map_dispatch_to_props';

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
        <form onSubmit={e => {
          e.preventDefault();
          saveList(input.value);
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
        <CloseModal modalName={this.modalName} />
      </div>
    );
  }
}

export default connect(
  () => { return {} },
  mapDispatchToProps()
)(AddListModal);
