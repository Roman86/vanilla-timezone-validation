# Vanilla Timezone Validation

[![npm version](https://badge.fury.io/js/vanilla-timezone-validation.svg)](https://badge.fury.io/js/vanilla-timezone-validation)

A lightweight, zero-dependency, and tree-shakable library for validating [IANA](https://www.iana.org/time-zones) timezone strings, with flexible handling of canonical and non-canonical names.

This library leverages the native `Intl` API, ensuring that timezone validation is always up-to-date with the user's environment without needing to bundle large timezone databases.

## Key Features

-   **Zero Dependencies**: Truly zero-dependency.
-   **Lightweight & Tree-Shakable**: No bundled timezone data, uses the environment's native `Intl` API.
-   **Fully Typed**: Written in TypeScript with branded types for extra safety.

### Brief Overview of Exports

-   `convertToCanonicalTimezoneName`: Validates a timezone and **transforms** it to its canonical form (e.g., `US/Eastern` becomes `America/New_York`). Returns `null` for invalid timezones.
-   `isCanonicalTimezoneName`: A type guard that returns `true` only if a timezone is **strictly** in its canonical form.
-   `isTimezoneLinkName`: A type guard that returns `true` only for **non-canonical** (link/alias) timezone names.
-   `isTimezoneName`: A type guard that returns `true` for **any valid timezone**, allowing both canonical and non-canonical names.
-   `CanonicalTimezoneName`: The branded `string` type for a canonical timezone.
-   `TimezoneLinkName`: The branded `string` type for a non-canonical (link) timezone.
-   `TimezoneName`: A union type of `CanonicalTimezoneName | TimezoneLinkName`.

Using branded types provides extra type safety, ensuring that you don't accidentally assign a plain `string` where a validated timezone is expected. You can use the exported types in your function signatures and interfaces.

### ❤️ Enjoying this package? Consider buying me a coffee as a token of appreciation!

[<img src="https://raw.githubusercontent.com/Roman86/assets/main/img/bmc_qr_240.png" alt="Buy Me A Coffee" width="120" height="120">](https://www.buymeacoffee.com/romanjs)


## Installation

```bash
npm install vanilla-timezone-validation
```

or

```bash
yarn add vanilla-timezone-validation
```

## Usage

The library exports four main functions to cover the most common use cases.

### `convertToCanonicalTimezoneName`

This function validates that a string is a valid IANA timezone. If a non-canonical name is provided, it automatically transforms it into its canonical equivalent. If the timezone is invalid, it returns `null`.

```typescript
import { convertToCanonicalTimezoneName } from 'vanilla-timezone-validation';

// Transforms non-canonical to canonical
const result1 = convertToCanonicalTimezoneName('Asia/Calcutta');
console.log(result1); // => 'Asia/Kolkata'

// Keeps canonical names as they are
const result2 = convertToCanonicalTimezoneName('America/New_York');
console.log(result2); // => 'America/New_York'

// Returns null for invalid timezones
const result3 = convertToCanonicalTimezoneName('Invalid/Timezone');
console.log(result3); // => null
```

### `isCanonicalTimezoneName`

This type guard checks if the provided string is a **strictly canonical** IANA timezone name. It will return `false` for any valid but non-canonical names.

```typescript
import { isCanonicalTimezoneName, CanonicalTimezoneName } from 'vanilla-timezone-validation';

const tz = 'Europe/London';

if (isCanonicalTimezoneName(tz)) {
  // tz is now typed as CanonicalTimezoneName
  const canonicalTz: CanonicalTimezoneName = tz;
  console.log(`${canonicalTz} is a canonical timezone.`); // => 'Europe/London is a canonical timezone.'
}

// Rejects non-canonical names
console.log(isCanonicalTimezoneName('GB')); // => false ('GB' is a non-canonical alias for 'Europe/London')
```

### `isTimezoneLinkName`

This type guard checks if the provided string is a **non-canonical** (also known as a "link" or "alias") IANA timezone name. It will return `false` for strictly canonical names.

```typescript
import { isTimezoneLinkName, TimezoneLinkName } from 'vanilla-timezone-validation';

const tz = 'GB'; // 'GB' is a non-canonical alias for 'Europe/London'

if (isTimezoneLinkName(tz)) {
  // tz is now typed as TimezoneLinkName
  const linkTz: TimezoneLinkName = tz;
  console.log(`${linkTz} is a timezone link name.`); // => 'GB is a timezone link name.'
}

// Rejects canonical names
console.log(isTimezoneLinkName('Europe/London')); // => false
```

### `isTimezoneName`

This type guard is more lenient and validates that a string is a valid IANA timezone, returning `true` for both canonical and non-canonical names.

```typescript
import { isTimezoneName, TimezoneName } from 'vanilla-timezone-validation';

// Accepts canonical names
if (isTimezoneName('Australia/Sydney')) {
  console.log('It is a valid timezone.'); // => 'It is a valid timezone.'
}

// Also accepts non-canonical names
const tz = 'US/Eastern';
if (isTimezoneName(tz)) {
  // tz is now typed as TimezoneName
  const anyValidTz: TimezoneName = tz;
  console.log(`${anyValidTz} is a valid timezone.`); // => 'US/Eastern is a valid timezone.'
}

// Returns false for invalid timezones
console.log(isTimezoneName('Mars/Olympus_Mons')); // => false
```

## Getting a List of Timezones

While this library focuses on *validating* timezone strings, it doesn't provide an exhaustive list of them. The environment already provides a way to get a list of all supported IANA timezone names through the native `Intl` API.

You can get an array of all available timezones like this:

```typescript
const availableTimezones = Intl.supportedValuesOf('timeZone');

console.log(availableTimezones);
// => ['Africa/Abidjan', 'Africa/Accra', 'Africa/Addis_Ababa', ..., 'Zulu']
```

This approach ensures that you are working with the timezones supported by the user's runtime environment (browser or server), without needing to bundle a large, static list.

## For Zod Users

If you are using [Zod](https://zod.dev/), you might be interested in [zod-timezone-validation](https://www.npmjs.com/package/zod-timezone-validation), which offers similar functionality as a Zod schema.

## License

This project is licensed under the MIT License.
