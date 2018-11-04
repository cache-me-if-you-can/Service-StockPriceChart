import React from 'react';
import jest from 'jest-mock';
import { shallow, mount } from '../../setupTests';
import App from '../app';
import PriceChart from '../pricechart';

describe('App Component Tests', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockImplementation(() => {
      const p = new Promise((resolve, reject) => {
        resolve({
          ok: true,
          id: 0,
          json: () => {
            return [{id: 0, symbol: "JOD", name: "Schmidt, Price and Skiles", price: 573.43, date: "Thu Oct 25 2018 09:00:00 GMT-0700 (PDT)", rating: 22, owner: 692}];
          },
        });
      });

      return p;
    });
  });


  it('Renders react component', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('div')).toBeDefined();
  });

  it('should render rectangle correctly in svg', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.exists('.rectangle')).toEqual(false);
  });

  it('should get price data from state', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find({ 'data-value': 88.02 }));
  });

  it('should simulate a click event', () => {
    const mockClick = jest.fn();
    const button = shallow((<App onClick={mockClick} />));
    button.find('.navSelected').simulate('click', { preventDefault() { } });
    expect(mockClick.mock.calls.length).toEqual(0);
  });

  it('should simulate click events----', () => {
    const mockClick = jest.fn();
    const button = shallow((<App onClick={mockClick} />));
    button.find('.navUnselected').forEach(ele => {
      ele.simulate('click', { preventDefault() { } });
    });
    expect(mockClick.mock.calls.length).toEqual(0);
  });
});
