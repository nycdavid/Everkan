import React from 'react';
import _ from 'lodash';
import axios from 'axios';
import { connect } from 'react-redux';
import ModalContainer from './modals/ModalContainer.jsx';
import Lists from './Lists.jsx';
import masterDispatcher from '../dispatchers/map_dispatch_to_props';

require('../stylesheets/board.scss');

class Board extends React.Component {
  render() {
    const { lists, modals, openModal } = this.props;
    return (
      <div className="board">
        <ModalContainer />
        <button
          className="btn btn-default"
          onClick={() => { openModal({ name: 'AddList' }) }}
        >
          Add a list...
        </button>
        <Lists lists={lists} />
      </div>
    );
  }
}

export default connect(
  (state) => ({
    modals: state.modals,
    lists: state.lists
  }),
  masterDispatcher()
)(Board);
