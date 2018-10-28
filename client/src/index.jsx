import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Chart from './components/chart.jsx';

const moment = require('moment');


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      priceData: [{
        symbol: '',
        name: '',
        owner: 0,
        price: 0,
        rating: 0,
      }],
    }
    
    this.handleGet.bind(this);
  }

  componentDidMount() {
    this.handleGet();
  }
 
  handleGet(symbol = 'MMMM') {
    fetch(`/api/symbol/${symbol}/day`)
      .then(response => response.json())
      .then(priceData => this.setState({ priceData }))
      .catch(error => console.log(error));
  }

  render () {
    const symbol = this.state.priceData[0].symbol;
    const name = this.state.priceData[0].name;
    const rating = this.state.priceData[0].rating;
    const owner = this.state.priceData[0].owner;

    return (
      <div>
        <div className="header">
          <div className="name">{name}</div>
          <div className="rating">{rating}%</div>
          <div className="owner">{owner}</div>
        </div>
        <div className="price">$100</div>
        <Chart state={this.state} />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));