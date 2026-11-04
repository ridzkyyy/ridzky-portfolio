import { useEffect, useState } from 'react';

const CASE = /^#\/case\/([a-z0-9-]+)$/;

/** The case id in `#/case/<id>`, or null on the home page. Section anchors like `#work` stay home. */
export function caseFromHash(hash: string): string | null {
  return CASE.exec(hash)?.[1] ?? null;
}

export const caseHref = (id: string) => `#/case/${id}`;

export function useHashRoute() {
  const [hash, setHash] = useState(() => location.hash);
  useEffect(() => {
    const update = () => setHash(location.hash);
    addEventListener('hashchange', update);
    return () => removeEventListener('hashchange', update);
  }, []);
  return { hash, caseId: caseFromHash(hash) };
}
