import { useCallback, useEffect, useState } from "react";

export const useLocationHash = () => {
  const [hash, setHash] = useState<string>(() => window.location.hash);


  useEffect(() => {
    const hashChangeHandler = () => {
      setHash(window.location.hash);
    };

    window.addEventListener("hashchange", hashChangeHandler);

    return () => {
      window.removeEventListener("hashchange", hashChangeHandler);
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
