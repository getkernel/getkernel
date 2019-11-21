import React from 'react';
import { shallow } from 'enzyme';
import { PageContent } from '../PageContent';

describe('<PageContent />', () => {
  test('should correctly render PageContent component', () => {
    const wrapper = shallow(<PageContent children={<h1>Hello Jest!</h1>} />);
    expect(wrapper).toMatchSnapshot();
  });
});
