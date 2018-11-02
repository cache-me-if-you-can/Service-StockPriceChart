import React from 'react';
import { LineChart, Line, Tooltip } from 'recharts';

const PriceChart = (props) => {
  const viewBoxWidth = screen.width * 0.95;
  const viewBoxHeight = 300;
  const data = [];

  props.state.priceData.forEach((ele) => {
    const time = ele.date;
    const { price } = ele;
    data.push({ time, price });
  });

  return (
    <div>
      <LineChart width={viewBoxWidth} height={viewBoxHeight} data={data} onMouseMove={(e) => props.handlePriceChange(e)}>
        <Tooltip />
        <Line
          type="monotone"
          strokeWidth={2}
          dataKey="price"
          dot={false}
          activeDot={{ stroke: '#FFFFFF', strokeWidth: 2, r: 5 }}
          stroke="#21ce99"
          animationDuration={900}
        />
      </LineChart>
    </div>
  );
};

export default PriceChart;
