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
    
    this.handleGet.bind(this);
  }

  componentDidMount() {
    this.handleGet();
  }
 
  handleGet(symbol = 'MMMM') {
    fetch(`/api/symbol/${symbol}/day`)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log(error));
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