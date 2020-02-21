import { setAvailableVersions } from '../filters';

describe('actions/filters', () => {
  test('should generate available versions filter object', () => {
    const data = { entries: ['some', 'data'] };
    const action = setAvailableVersions(data);
    expect(action).toEqual({
      type: 'SET_AVAILABLE_VERSIONS',
      data,
    });
  });
});
