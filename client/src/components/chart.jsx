import React from 'react';

const Chart = (props) => (
  <div>
    <h4> Repo List Component </h4>
    There are {props.repos.length} repos.
  </div>
)

export default Chart;