import {
  convertToCanonicalTimezoneName,
  isCanonicalTimezoneName,
  isTimezoneLinkName,
  isTimezoneName,
} from './index';

describe('timezones test', () => {
  const canonicalTZ = 'America/Chicago';
  const canonicalTZLowerCase = 'america/chicago';
  const nonCanonicalAlias = 'US/Central';
  const nonCanonicalAliasLowerCase = 'us/central';
  const nonsense = 'nonsense';

  test('flexible: canonical and non-canonical', () => {
    expect(isTimezoneName(nonCanonicalAlias)).toBe(true);
    expect(isTimezoneName(nonCanonicalAliasLowerCase)).toBe(true);
    expect(isTimezoneName(canonicalTZ)).toBe(true);
    expect(isTimezoneName(nonsense)).toBe(false);
  });
  test('link', () => {
    expect(isTimezoneLinkName(nonCanonicalAlias)).toBe(true);
    expect(isTimezoneLinkName(nonCanonicalAliasLowerCase)).toBe(true);
    expect(isTimezoneLinkName(canonicalTZ)).toBe(false);
    expect(isTimezoneLinkName(canonicalTZLowerCase)).toBe(false);
    expect(isTimezoneLinkName(nonsense)).toBe(false);
  });
  test('canonical', () => {
    expect(isCanonicalTimezoneName(canonicalTZ)).toBe(true);
    expect(isCanonicalTimezoneName(canonicalTZLowerCase)).toBe(true);
    expect(isCanonicalTimezoneName(nonCanonicalAliasLowerCase)).toBe(false);
    expect(isCanonicalTimezoneName(nonCanonicalAlias)).toBe(false);
    expect(isCanonicalTimezoneName(nonsense)).toBe(false);
  });
  test('convert to canonical', () => {
    expect(convertToCanonicalTimezoneName(canonicalTZ)).toBe(canonicalTZ);
    expect(convertToCanonicalTimezoneName(canonicalTZLowerCase)).toBe(
      canonicalTZ,
    );
    expect(convertToCanonicalTimezoneName(nonCanonicalAlias)).toBe(canonicalTZ);
    expect(convertToCanonicalTimezoneName(nonCanonicalAliasLowerCase)).toBe(
      canonicalTZ,
    );
    expect(convertToCanonicalTimezoneName(nonsense)).toBeNull();
  });
});
