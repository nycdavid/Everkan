import React from 'react';
import { connect } from 'react-redux';
import { openModal } from '../actions';
import List from './List.jsx';

require('../stylesheets/lists.scss');

class Lists extends React.Component {
  render() {
    const { lists, openModal } = this.props
    return (
      <ul className="lists-container">
        {lists.map((list, idx) => (
          <List 
            name={list.name} 
            cards={list.cards}
            listId={list.id}
            index={idx} 
            key={`list-${idx}`}
            openAddCardModal={() => { openModal('AddCard', { listName: list.name, listId: list.id }) }}
          />
        ))}
      </ul>
    );
  }
}

function mapStateToProps(state) {
  return {
    lists: state.lists,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    openModal: function(modalName, options = {}) {
      dispatch(openModal(modalName, options));
    }
  }
}

const ConnectedLists = connect(
  mapStateToProps,
  mapDispatchToProps
)(Lists);

export default ConnectedLists;
