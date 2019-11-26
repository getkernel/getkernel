import {
  setAvailableVersionsFilter,
  setSelectedVersionsFilter,
  setReleaseType,
} from '../filters';

describe('actions/filters', () => {
  test('should generate available versions filter object', () => {
    const data = { entries: ['some', 'data'] };
    const action = setAvailableVersionsFilter(data);
    expect(action).toEqual({
      type: 'SET_AVAILABLE_VERSIONS_FILTER',
      data,
    });
  });

  test('should generate selected versions filter object', () => {
    const filters = ['5.4', '5.3'];
    const action = setSelectedVersionsFilter(filters);
    expect(action).toEqual({
      type: 'SET_SELECTED_VERSIONS_FILTER',
      filters,
    });
  });

  test('should generate release type filter object', () => {
    const filter = 'rc';
    const action = setReleaseType(filter);
    expect(action).toEqual({
      type: 'SET_RELEASE_TYPE',
      filter,
    });
  });
});
