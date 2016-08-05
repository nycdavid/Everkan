import React from 'react';
import BaseModal from './BaseModal.jsx';
import { connect } from 'react-redux';
import mapDispatchToProps from '../../dispatchers/map_dispatch_to_props';

class AddCardModal extends BaseModal {
  constructor(props) {
    super(props);
    this.modalName = 'AddCard';
  }

  classModifier() {
    return '--add-card';
  }

  markup() {
    let input;
    const { lists, saveCard } = this.props;

    return (
      <div>
        <form
          onSubmit={e => {
            e.preventDefault();
            const list = this.props.options.list;
            saveCard(list.id, input.value);
            input.value = '';
          }}
        >
          <div>
            <h3>Add a card to {this.props.options.list.name}</h3>
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

function getList(lists, id) {
  return _.find(lists, list => list.id === id);
}

export default connect(
  function(state) { return { lists: state.lists } },
  mapDispatchToProps()
)(AddCardModal);
