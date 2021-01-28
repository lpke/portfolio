/**
 * useLocalState
 *
 * - gets local browser storage from browser and assigns to a react state
 * - accepts a default value and the key in which that value will be stored against
 */

import { useState, useEffect } from "react";

export default function useLocalState(defaultValue, key) {
  const [value, setValue] = useState(defaultValue);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const localValue = window.localStorage.getItem(key);

    if (localValue !== null) {
      setValue(JSON.parse(localValue));
      setLoaded(true);
    } else {
      setLoaded(true);
    }

  }, [key]);

  useEffect(() => {
    if (loaded) {
      window.localStorage.setItem(key, JSON.stringify(value));
    }
  }, [key, value, loaded]);

  return [value, setValue];
}