/* GitHub Repository - Exercise */

import { useCallback, useEffect, useRef } from "react";

//hook qui permet de savoir si le composant est monté ou pas
//param = ref
export const useIsMounted = () => {
  const isMountedRef = useRef(true);

  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);
  
  return useCallback(() => isMountedRef.current, []);
};
