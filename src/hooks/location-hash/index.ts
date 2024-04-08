import { useCallback, useEffect, useState } from "react";

export const useLocationHash = () => {
  const [hash, setHash] = useState<string>(() => window.location.hash);

  if(typeof window === 'undefined') {
    return {hash: '', updateHash: () => {}};
  }
  
  useEffect(() => {
    const hashChangeHandler = () => {
      setHash(window.location.hash);
    };

      document.addEventListener("hashchange", hashChangeHandler);

    return () => {
      document.removeEventListener("hashchange", hashChangeHandler);
    };
  }, []);

  const updateHash = useCallback((newHash: string) => {
      if (newHash !== hash) {
        window.location.hash = newHash;
        setHash(newHash);
      }
    }, [hash]);

  return {hash, updateHash};
};
