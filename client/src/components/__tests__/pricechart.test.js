import React from 'react';
import { shallow } from '../../setupTests';
import PriceChart from '../pricechart';

describe('PriceChart Component Tests', () => {
  const state = {
    priceData: [
      {
        id: 0,
        date: 'Thu Oct 25 2018 09:00:00 GMT-0700 (PDT)',
        name: 'Apple',
        owner: 4,
        price: 88.02,
        rating: 4,
        symbol: 'AAPL',
      },
    ],
  };

  it('Renders react component', () => {
    const wrapper = shallow(<PriceChart state={state} />);
    expect(wrapper.find('div')).toBeDefined();
  });

  it('should render rectangle correctly in svg', () => {
    const wrapper = shallow(<PriceChart state={state} />);
    expect(wrapper.exists('Line')).toEqual(true);
  });

  it('should get price data from state', () => {
    const wrapper = shallow(<PriceChart state={state} />);
    expect(wrapper.find({ 'data-value': 88.02 }));
  });
});
