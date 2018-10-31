import React from 'react';

const Chart = (props) => {
  const viewBoxWidth = 630;
  const viewBoxHeight = 200;
  const viewBox = `0 0 ${viewBoxWidth} ${viewBoxHeight}`;
  const totalXPoints = (18 - 9) * 60 / 5;
  const xInterval = (viewBoxWidth - 50) / totalXPoints;

  function convertToYAxis(input) {
    const length = Math.floor(props.state.priceData[0].price).toString().length;
    const base = Math.pow(10, length);
    return viewBoxHeight - (input / base * viewBoxHeight);
  };

  let renderThis = '';
  let xAxis = 0;
  const coordinates = [];

  props.state.priceData.forEach((ele, i) => {
    let circleObj = {};
    if (i !== 0) {
      xAxis += Math.round(xInterval * 1000) / 1000;
    }
    const xAxisStr = xAxis.toString();
    const yAxis = convertToYAxis(ele.price);
    circleObj.cx = xAxis;
    circleObj.cy = yAxis;
    circleObj.date = ele.date;
    circleObj.price = ele.price;
    coordinates.push(circleObj);
    renderThis += xAxisStr + ',' + yAxis.toString() + ' ';
  })

  function handleMouseEnter(e) {
    const coorX = e.target.getAttribute('x');
    const circleElement = document.getElementById(coorX);
    circleElement.classList.remove('circle');
    circleElement.classList.add('circleSelected');
  }

  function handleMouseOut(e) {
    const coorX = e.target.getAttribute('x');
    const circleElement = document.getElementById(coorX);
    circleElement.classList.remove('circleSelected');
    circleElement.classList.add('circle');
  }

  const barEventListener = coordinates.map((ele, i) => {
    return (
      <g key={i}>
        <rect className="rectangle" width={xInterval} height="100%" x={ele.cx} onMouseEnter={(e) => handleMouseEnter(e)} onMouseOut={(e) => handleMouseOut(e)} />
        <path strokeWidth="1"  />
        <circle id={ele.cx} stroke="#FFFFFF" fill="#cea774" strokeWidth="2" className="circle" cx={ele.cx} cy={ele.cy} data-value={ele.price} r="5" />
      </g>
    )
  });



  return (
    <div>
      <svg viewBox={viewBox} className="chart" >
        <polyline fill="none" stroke="#cea774" strokeWidth="2" points={renderThis} />
        {barEventListener}
      </svg>
      <p id="demo"></p>
   </div>
  )
};

export default Chart;
