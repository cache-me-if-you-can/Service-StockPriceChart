import React from 'react';

const Chart = (props) => {
  const viewBoxWidth = 600;
  const viewBoxHeight = 200;
  const viewBox = `0 0 ${viewBoxWidth} ${viewBoxHeight}`;
  const totalXPoints = (18 - 9) * 60 / 5;
  const xInterval = viewBoxWidth / totalXPoints;

  function convertToYAxis(input) {
    const length = Math.floor(props.state.priceData[0].price).toString().length;
    const base = Math.pow(10, length);
    return input / base * viewBoxHeight;
  };

  let renderThis = '';
  let xAxis = 0;
  props.state.priceData.forEach((ele, i) => {
    if (i !== 0) {
      xAxis += Math.round(xInterval * 1000) / 1000;
    }

    let xAxisStr = xAxis.toString();
    let yAxis = convertToYAxis(ele.price);
    renderThis += xAxisStr + ',' + yAxis.toString() + ' '
  })

  console.log(props.state.priceData[0]);

  function myFunction(e) {
    console.log(e);

    var x = e.clientX;
    var y = e.clientY;
    var coor = "Coordinates: (" + x + "," + y + ")";
    document.getElementById("demo").innerHTML = coor;
  }

  function clearCoor() {
    document.getElementById("demo").innerHTML = "";
  }


  return (
    <div onMouseMove={(e) => myFunction(e)} onMouseOut={(e) => clearCoor(e)}>
      <svg viewBox={viewBox} className="chart">
        <polyline fill="none" stroke="#cea774" strokeWidth="2" points={renderThis} />
      </svg>
      <p id="demo"></p>
   </div>
  )
};

export default Chart;
