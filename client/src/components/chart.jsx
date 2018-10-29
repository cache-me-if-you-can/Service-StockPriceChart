import React from 'react';

const Chart = (props) => {
  function convertToYAxis(input) {
    const length = props.state.priceData[0].toString().length + 1;
    const base = 10 * length;
    return input / base * 100;
  };
  
  const viewBoxWidth = 500;
  const viewBoxHeight = 100;
  const viewBox = `0 0 ${viewBoxWidth} ${viewBoxHeight}`;
  const totalXPoints = (18 - 9) * 60 / 5;
  const xInterval = viewBoxWidth / totalXPoints;
  
  let renderThis = '';
  let xAxis = 0;
  props.state.priceData.forEach(ele => {
    xAxis += Math.round(xInterval * 1000) / 1000;
    let xAxisStr = xAxis.toString();
    let yAxis = convertToYAxis(ele.price);
    renderThis += xAxisStr + ',' + yAxis.toString() + ' '
  })

  const arrayOfPrice = props.state.priceData;
  console.log(arrayOfPrice);
  

  return (
    <div>
      <svg viewBox={viewBox} className="chart">
        <polyline fill="none" stroke="#0074d9" strokeWidth="3" points={renderThis} />
      </svg>
   </div>
  )
};

export default Chart;
