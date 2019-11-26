import React from 'react';
import { shallow } from 'enzyme';
import PageContent from '../PageContent';

describe('<PageContent />', () => {
  test('should correctly render PageContent component', () => {
    const wrapper = shallow(
      <PageContent>
        <h1>Hello Jest!</h1>
      </PageContent>,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
