import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import masterDispatcher from '../dispatchers/master_dispatcher';

require('../stylesheets/cards.scss');

class Cards extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { openModal } = this.props;

    if (!_.isEmpty(this.props.cards)) {
      return (<ul className="cards">
        {this.props.cards.map((card, idx) => (
          <li
            className="cards__card"
            key={`list-card-${idx}`}
            onClick={() => {
              const list = this.props.list;
              openModal({ name:'ViewCard', list, card });
            }}
          >
            {card.name}
          </li>
        ))}
      </ul>);
    }
    return (<ul className="cards"></ul>);
  }
}

export default connect(
  () => { return {} },
  masterDispatcher()
)(Cards);
