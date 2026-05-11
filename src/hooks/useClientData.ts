'use client';

import { useState, useEffect } from 'react';

export function useClientData<T>(factory: () => T, initial: T, deps: React.DependencyList = []): T {
  const [data, setData] = useState<T>(initial);
  useEffect(() => {
    setData(factory());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  return data;
}
