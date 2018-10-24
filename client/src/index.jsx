import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Chart from './components/chart.jsx';

const moment = require('moment');
// moment().format();


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      priceData: [],
    }
    
  }

  componentDidMount(event) {

  }

  handleGet () {
    let symbol = 'mm';

    $.ajax({
      method: 'GET',
      url: `/api/day/symbol/:${symbol}`,
      contentType: 'application/json',
      success: function (priceData) {
        console.log(priceData);
        that.setState({ priceData });
      },
      error: function (error) {
        console.log(error);
      }
    });
  }

  render () {
    
    return (
      <div>
        <h1>testing</h1>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));