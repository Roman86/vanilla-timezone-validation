import { primitiveMemo } from './primitiveMemo';

const canonicalTzNamesLowerCaseSet = new Set(
  Intl.supportedValuesOf('timeZone').map((tz) => tz.toLowerCase()),
);

export type TimezoneLinkName = string & { __brand: 'TimezoneLinkName' };
export type CanonicalTimezoneName = string & {
  __brand: 'CanonicalTimezoneName';
};
export type TimezoneName = CanonicalTimezoneName | TimezoneLinkName;

function tzAdapter(
  tz: string,
  returnCanonical: true,
): CanonicalTimezoneName | null;
function tzAdapter(tz: string, returnCanonical: boolean): TimezoneName | null {
  // Accept common legacy aliases that are not in the IANA time zone database
  try {
    // Intl.DateTimeFormat accepts non-canonical, while the supportedValuesOf only returns canonical
    const formatter = Intl.DateTimeFormat(undefined, { timeZone: tz });
    if (returnCanonical) {
      const resolved = formatter.resolvedOptions().timeZone;
      return isCanonicalTimezoneName(resolved) ? resolved : null;
    }
    return isTimezoneName(tz) ? tz : null;
  } catch (_e) {
    return null;
  }
}

const tzAdapterMemo = primitiveMemo(tzAdapter);

export const isCanonicalTimezoneName = (
  timeZone: string,
): timeZone is CanonicalTimezoneName =>
  canonicalTzNamesLowerCaseSet.has(timeZone.toLowerCase());

export const isTimezoneLinkName = (
  timeZone: string,
): timeZone is TimezoneLinkName =>
  !isCanonicalTimezoneName(timeZone) && isTimezoneName(timeZone);

export const isTimezoneName = (timeZone: string): timeZone is TimezoneName => {
  if (isCanonicalTimezoneName(timeZone)) {
    return true;
  }
  try {
    Intl.DateTimeFormat(undefined, { timeZone: timeZone });
    return true;
  } catch (_e) {
    return false;
  }
};

export const convertToCanonicalTimezoneName = (
  timeZone: string,
): CanonicalTimezoneName | null => tzAdapterMemo(timeZone, true);
