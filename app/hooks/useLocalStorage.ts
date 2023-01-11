import React, { useEffect, useState } from "react";

type useLocalStorageProps = {
  key: string;
  initialValue?: any;
};

export default function useLocalStorage({
  key,
  initialValue,
}: useLocalStorageProps) {
  const [storageValue, setStorageValue] = useState(() => {
    try {
      const value = localStorage.getItem(key);

      return value ? JSON.parse(value) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(storageValue));
  }, [key, storageValue]);

  return [storageValue, setStorageValue];
}
