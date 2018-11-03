import React from 'react';
import PriceChart from './pricechart.jsx';
import Chart from './chart.jsx';
import styles from './style.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.id = 0;
    this.name = '';
    this.rating = '';
    this.owner = '';
    this.state = {
      view: '1d',
      priceData: [{
        symbol: '',
        name: '',
        owner: 0,
        price: 0,
        rating: 0,
      }],
    };

    this.handleGetDay = this.handleGetDay.bind(this);
    this.handleGetWeek = this.handleGetWeek.bind(this);
    this.handlePriceChange = this.handlePriceChange.bind(this);
    this.changeView = this.changeView.bind(this);
    this.renderView = this.renderView.bind(this);
  }

  componentDidMount() {
    this.handleGetDay(this.id, '1d');
  }

  handleGetDay(id, view) {
    fetch(`/api/symbol/${id}/day`)
      .then(response => response.json())
      .then((priceData) => {
        this.name = priceData[id].name;
        this.rating = priceData[id].rating;
        this.owner = priceData[id].owner;
        this.setState({ priceData, view });
      })
      .catch(error => console.log(error));
  }

  handleGetWeek(id, view) {
    fetch(`/api/symbol/${id}/week`)
      .then(response => response.json())
      .then(priceData => this.setState({ priceData, view }))
      .catch(error => console.log(error));
  }

  handlePriceChange(e) {
    if (e.isTooltipActive) {
      const price = `$${e.activePayload[0].value}`;
      document.getElementById(styles.mainPrice).innerHTML = price;
    }
  }

  changeView(e, view) {
    e.preventDefault();
    if (view === '1w') {
      this.handleGetWeek(this.id + 1, view);
    } else if (view === '1m') {
      this.handleGetWeek(this.id + 2, view);
    } else if (view === '3m') {
      this.handleGetWeek(this.id + 3, view);
    } else if (view === '1y') {
      this.handleGetWeek(this.id + 4, view);
    } else if (view === '5y') {
      this.handleGetWeek(this.id + 5, view);
    } else {
      this.handleGetDay(this.id, '1d');
    }
  }

  renderView() {
    const { view } = this.state;
    if (view === '1d') {
      return <PriceChart state={this.state} handlePriceChange={this.handlePriceChange} />;
    } else if (view === '1w') {
      return <PriceChart state={this.state} handlePriceChange={this.handlePriceChange} />;
    } else if (view === '1m') {
      return <PriceChart state={this.state} handlePriceChange={this.handlePriceChange} />;
    } else if (view === '3m') {
      return <PriceChart state={this.state} handlePriceChange={this.handlePriceChange} />;
    } else if (view === '1y') {
      return <PriceChart state={this.state} handlePriceChange={this.handlePriceChange} />;
    } else if (view === '5y') {
      return <PriceChart state={this.state} handlePriceChange={this.handlePriceChange} />;
    }
  }

  render() {
    const { name, rating, owner } = this;

    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.name}><h1>{name}</h1></div>
          <a to="analyst-ratings" className={styles.tag} href="#">
            <span className={styles.tagIcon}>
              <svg width="16" height="16" viewBox="0 0 28 28"><g fillRule="evenodd" transform="translate(-4 -4)"><path id="tag-a" d="M20.99975,8 C20.44775,8 19.99975,7.552 19.99975,7 C19.99975,6.448 20.44775,6 20.99975,6 C21.55175,6 21.99975,6.448 21.99975,7 C21.99975,7.552 21.55175,8 20.99975,8 M21.99975,4 L14.82775,4 C14.29775,4 13.78875,4.21 13.41375,4.585 L4.58575,13.414 C3.80475,14.195 3.80475,15.461 4.58575,16.242 L11.75675,23.414 C12.53775,24.195 13.80475,24.195 14.58575,23.414 L23.41375,14.586 C23.78875,14.211 23.99975,13.702 23.99975,13.172 L23.99975,6 C23.99975,4.896 23.10375,4 21.99975,4"></path></g></svg>
            </span>
            <span className={styles.innerTag}>
              {rating}
              %
            </span>
            <span className={styles.tagTooltip}>{rating}% of analysts agree that {name} is a buy.</span>
          </a>
          <a to="price-paid" className={styles.tag} href="#">
            <span className={styles.tagIcon}>
              <svg width="16" height="16" viewBox="0 0 18 20"><g fillRule="evenodd"><ellipse cx="6" cy="3.5" rx="3.333" ry="3.5"></ellipse><path d="M4.224,8.4 L7.776,8.4 L7.776,8.4 C10.1088508,8.4 12,10.2911492 12,12.624 L12,14 L0,14 L0,12.624 L8.8817842e-16,12.624 C6.02486595e-16,10.2911492 1.89114922,8.4 4.224,8.4 Z"></path></g></svg>
            </span>
            <div className={styles.innerTag}>
              {owner}
            </div>
            <span className={styles.tagTooltip}>{owner} people own {name} on our website.</span>
          </a>
        </div>
        <div id={styles.mainPrice}>${this.state.priceData[0].price}</div>
        <div>
          {this.renderView()}
        </div>
        <div className={styles.nav}>
          <span className={this.state.view === '1d'
            ? styles.navSelected
            : styles.navUnselected}
            onClick={(e) => this.changeView(e, '1d')}>
            1D
          </span>
          <span className={this.state.view === '1w'
            ? styles.navSelected
            : styles.navUnselected}
            onClick={(e) => this.changeView(e, '1w')}>
            1W
          </span>
          <span className={this.state.view === '1m'
            ? styles.navSelected
            : styles.navUnselected}
            onClick={(e) => this.changeView(e, '1m')}>
            1M
          </span>
          <span className={this.state.view === '3m'
            ? styles.navSelected
            : styles.navUnselected}
            onClick={(e) => this.changeView(e, '3m')}>
            3M
          </span>
          <span className={this.state.view === '1y'
            ? styles.navSelected
            : styles.navUnselected}
            onClick={(e) => this.changeView(e, '1y')}>
            1Y
          </span>
          <span className={this.state.view === '5y'
            ? styles.navSelected
            : styles.navUnselected}
            onClick={(e) => this.changeView(e, '5y')}>
            5Y
          </span>
        </div>
        {/* <Chart state={this.state} /> */}
      </div>
    );
  }
}

export default App;
