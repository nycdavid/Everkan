import React from 'react';
import { connect } from 'react-redux';

import Cards from './Cards.jsx';
import masterDispatcher from '../dispatchers/master_dispatcher';

require('../stylesheets/list.scss');

class List extends React.Component {
  render() {
    const { openModal } = this.props;
    const colStyle = {
      left: `${this.props.index * 280 + (40 * this.props.index)}px`
    }

    return (
      <li
        className="list"
        style={colStyle}
      >
        <h4 className="list__center-container list__name">{this.props.list.name}</h4>
        <Cards list={this.props.list} cards={this.props.list.cards} />
        <button
          className="btn btn-default list__add-card"
          onClick={() => {
            const list = this.props.list;
            openModal({ name: 'AddCard', list });
          }}
        >
          Add card...
        </button>
      </li>
    );
  }
}

const ConnectedList = connect(
  () => { return {} },
  (dispatch) => { return masterDispatcher(dispatch) }
)(List);

export default ConnectedList;
