import { InjectionToken } from '@angular/core';

/** Injection token for the application-wide date display format.
 *  Default: 'shortDate' (e.g. 1/15/2024).
 *  Override at root or feature level to honour the user's preferred locale format.
 */
export const DATE_FORMAT = new InjectionToken<string>('DATE_FORMAT', {
  providedIn: 'root',
  factory: () => 'shortDate',
});
