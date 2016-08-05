import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import masterDispatcher from '../../dispatchers/map_dispatch_to_props';
import _ from 'lodash';
import BaseModal from './BaseModal.jsx';

class ViewCardModal extends BaseModal {
  constructor(props) {
    super(props);
    this.modalName = 'ViewCard';
    _.bindAll(this, [
      'toggleDateInput'
    ]);

    this.state = {
      dateInputVisible: false,
      dueDate: ''
    };
  }

  toggleDateInput() {
    this.setState({ dateInputVisible: !this.state.dateInputVisible });
  }

  classModifier() {
    return '--view-card';
  }

  markup() {
    const { updateList, updateCard } = this.props;
    const dateInputStyle = {
      display: this.state.dateInputVisible ? 'block' : 'none',
    };

    return (
      <div>
        <h1>{this.props.options.card.name}</h1>
        <h3>{calculateDaysLeft(this.props.options.card.dueDate)} days remaining.</h3>
        <ul className="card-options">
          <li>
            <button
              className="btn btn-default"
              onClick={this.toggleDateInput}
            >
              Add Due Date
            </button>
            <div
              style={dateInputStyle}
              className="card-options__date-input"
            >
              <div className="date-input-section form-group">
                <input
                  type="date"
                  placeholder="MM/DD/YYYY"
                  onChange={event => {
                    this.setState({ dueDate: event.target.value });
                  }} />
                <i
                  className="date-option save-date fa fa-check"
                  onClick={() => {
                    const timestamp = moment(this.state.dueDate).format('x');
                    const list = this.props.options.list;
                    const card = this.props.options.card;
                    card.dueDate = timestamp;
                    updateCard(list.id, card)
                  }}
                >
                </i>
                <i
                  onClick={this.toggleDateInput}
                  className="date-option close-date-input fa fa-times">
                </i>
              </div>
            </div>
          </li>
        </ul>
      </div>
    );
  }
}

function calculateDaysLeft(timestamp) {
  if (!timestamp) { return false };
  const timeDiff = timestamp - Date.now();
  return timeDiff < 0 ? '0' : Math.floor(moment.duration(timeDiff).asDays());
}

const ConnectedViewCardModal = connect(
  () => { return {} },
  masterDispatcher()
)(ViewCardModal)

export default ConnectedViewCardModal;
