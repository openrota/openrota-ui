import { useCallback } from 'react';
import debounce from 'lodash.debounce';

export const useDebounce = (
  fnToDebounce: (...args: any) => any,
  durationInMs = 200
) => {
  if (isNaN(durationInMs)) {
    throw new TypeError('durationInMs for debounce should be a number');
  }

  if (typeof fnToDebounce !== 'function') {
    throw new TypeError('fnToDebounce should be a function');
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useCallback(debounce(fnToDebounce, durationInMs), [
    fnToDebounce,
    durationInMs,
  ]);
};
