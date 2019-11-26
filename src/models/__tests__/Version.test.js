import Version from '../Version';

let versionWithoutV;
let versionWithV;

beforeEach(() => {
  versionWithoutV = '3.12.10-rc5-trusty';
  versionWithV = `v${versionWithoutV}`;
});

describe('models/Version', () => {
  test('should create a valid Version object from version string', () => {
    const version = new Version(versionWithV);
    expect(version).toBeDefined();
    expect(version.major).toBe(3);
    expect(version.minor).toBe(12);
    expect(version.build).toBe(10);
    expect(version.patch).toBeUndefined();
    expect(version.extra).toBeUndefined();
    expect(version.distro).toBe('trusty');
    expect(version.error).toBeUndefined();
    expect(version.isRC()).toBeTruthy();
    expect(version.isCKT()).toBeFalsy();
    expect(version.toString()).toBe(versionWithV);
  });

  test('should create a valid Version object from a version string without the leading "v"', () => {
    const version = new Version(versionWithoutV);
    expect(version).toBeDefined();
    expect(version.major).toBe(3);
    expect(version.minor).toBe(12);
    expect(version.build).toBe(10);
    expect(version.error).toBeUndefined();
    expect(version.toString()).toBe(versionWithV);
  });

  test('should create an empty Version object when no argument is passed', () => {
    const version = new Version();
    expect(version.major).toBeUndefined();
    expect(version.minor).toBeUndefined();
    expect(version.build).toBeUndefined();
    expect(version.patch).toBeUndefined();
    expect(version.extra).toBeUndefined();
    expect(version.distro).toBeUndefined();
    expect(version.error).toBeUndefined();
    expect(version.isRC()).toBeFalsy();
    expect(version.isCKT()).toBeFalsy();
  });

  test('should return string representation of the object with or without leading "v"', () => {
    const version = new Version(versionWithV);
    expect(version.toString()).toBe(versionWithV);
    expect(version.toString(false)).toBe(versionWithoutV);
  });

  test('should return short string representation of the object with or without leading "v"', () => {
    const version = new Version(versionWithV);
    expect(version.toShortString()).toBe('v3.12');
    expect(version.toShortString(false)).toBe('3.12');
  });

  test('should return friendly string representation of the object with or without leading "v"', () => {
    const version = new Version(versionWithV);
    expect(version.toFriendlyString()).toBe('v3.12.10');
    expect(version.toFriendlyString(false)).toBe('3.12.10');
  });
});
