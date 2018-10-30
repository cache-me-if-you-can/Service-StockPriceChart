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
  props.state.priceData.forEach((ele, i) => {
    if (i !== 0) {
      xAxis += Math.round(xInterval * 1000) / 1000;
    }

    let xAxisStr = xAxis.toString();
    let yAxis = convertToYAxis(ele.price);
    renderThis += xAxisStr + ',' + yAxis.toString() + ' ';
  })

  console.log(props.state.priceData[0]);

  function myFunction(e) {
    const x = e.clientX;
    const y = e.clientY;
    const coor = "Coordinates: (" + x + "," + y + ")";
    document.getElementById("demo").innerHTML = coor;
  }

  function clearCoor() {
    document.getElementById("demo").innerHTML = "";
  }


  return (
    <div onMouseMove={(e) => myFunction(e)} onMouseOut={(e) => clearCoor(e)}>
      <svg viewBox={viewBox} className="chart">
        <polyline fill="none" stroke="#cea774" strokeWidth="2" points={renderThis} />
        <g class="data" data-setname="Our first data set">
          <circle cx="90" cy="192" data-value="7.2" r="4"></circle>
        </g>
      </svg>
      <p id="demo"></p>
   </div>
  )
};

export default Chart;
