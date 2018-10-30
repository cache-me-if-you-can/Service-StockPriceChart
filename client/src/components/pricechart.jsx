import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const moment = require('moment');

const PriceChart = (props) => {
  const viewBoxWidth = 600;
  const viewBoxHeight = 200;
  const data = [];

  props.state.priceData.forEach((ele, i) => {
    // const time = moment(ele.date).format('h:mm a');
    const time = ele.date;
    const price = ele.price;
    data.push({ time, price });
  })

  console.log(props.state.priceData[0]);
  console.log(data);

  return (
    <div>
      <LineChart width={viewBoxWidth} height={viewBoxHeight} data={data} onMouseMove={(e) => props.handlePriceChange(e)} >
        {/* <XAxis /> */}
        {/* <YAxis /> */}
        <Tooltip />
        <Line type="monotone" dataKey="price" dot={false} stroke="#cea774" />
      </LineChart>
   </div>
  )
};

export default PriceChart;
