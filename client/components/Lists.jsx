import React from 'react';

const Lists = ({ lists }) => (
  <ul>
    {lists.map((list, idx) => <li key={`list-name-${idx}`}>{list.name}</li>)}
  </ul>
)

export default Lists;
