import {
  setAvailableVersions,
  setSelectedVersions,
  setReleaseType,
} from '../filters';

describe('actions/filters', () => {
  test('should generate available versions filter object', () => {
    const data = { entries: ['some', 'data'] };
    const action = setAvailableVersions(data);
    expect(action).toEqual({
      type: 'SET_AVAILABLE_VERSIONS',
      data,
    });
  });

  test('should generate selected versions filter object', () => {
    const filters = ['5.4', '5.3'];
    const action = setSelectedVersions(filters);
    expect(action).toEqual({
      type: 'SET_SELECTED_VERSIONS',
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
