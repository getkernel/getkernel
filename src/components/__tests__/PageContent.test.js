import React, { useReducer } from 'react';
import { mount } from 'enzyme';
import { renderHook } from '@testing-library/react-hooks';
import { GlobalContext, GlobalProvider } from '../../contexts';
import PageContent from '../PageContent';
import globalReducer from '../../reducers/global';

describe('<PageContent />', () => {
  test('should not render children if isLoading is set to true', () => {
    const TestComponent = () => (
      <GlobalProvider>
        <PageContent>
          <h1>Hello Jest!</h1>
        </PageContent>
      </GlobalProvider>
    );
    const wrapper = mount(<TestComponent />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find(PageContent).find('h1').length).toBe(0);
  });

  test('should render children if isLoading is set to false', () => {
    const testState = { isLoading: false };

    const { result } = renderHook(() => {
      return useReducer(globalReducer, testState);
    });

    const [state] = result.current;

    const TestComponent = () => (
      <GlobalContext.Provider value={state}>
        <PageContent>
          <h1>Hello Jest!</h1>
        </PageContent>
      </GlobalContext.Provider>
    );
    const wrapper = mount(<TestComponent />);
    expect(wrapper).toMatchSnapshot();
    expect(
      wrapper
        .find(PageContent)
        .find('h1')
        .text(),
    ).toBe('Hello Jest!');
  });
});
