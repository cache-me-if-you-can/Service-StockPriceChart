import React from 'react';
import { shallow } from '../../setupTests';
import App from '../app';

describe('App Component Tests', () => {
  let app;

  beforeEach(() => {
    app = renderIntoDocument(
      <App searchYouTube={() => { }} />
    );
  });

  it('Renders react component', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('div')).toBeDefined();
  });

  it('should render rectangle correctly in svg', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.exists('.rectangle')).toEqual(true);
  });

  it('should get price data from state', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find({ 'data-value': 88.02 }));
  });
});
