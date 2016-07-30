import React from 'react';
import List from './List.jsx';

require('../stylesheets/lists.scss');

const Lists = ({ lists }) => (
  <ul className="lists-container">
    {lists.map((list, idx) => <List name={list.name} index={idx} key={`list-${idx}`} />)}
  </ul>
)

export default Lists;
