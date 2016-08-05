import React from 'react';
import { connect } from 'react-redux';
import { openModal } from '../actions';
import List from './List.jsx';
import masterDispatcher from '../dispatchers/map_dispatch_to_props';

require('../stylesheets/lists.scss');

class Lists extends React.Component {
  render() {
    const { lists, openModal } = this.props
    return (
      <ul className="lists-container">
        {lists.map((list, idx) => (
          <List
            list={list}
            index={idx}
            key={`list-${idx}`} />
        ))}
      </ul>
    );
  }
}

export default connect(
  (state) => { return { lists: state.lists } },
  masterDispatcher()
)(Lists);
