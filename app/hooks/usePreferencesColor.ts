import { useEffect, useState } from "react";

export default function usePreferencesColor() {
  const [color, setColor] = useState<"dark" | "light" | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    setColor(mediaQuery.matches ? "dark" : "light");

    mediaQuery.addEventListener("change", (e) =>
      setColor(e.matches ? "dark" : "light")
    );

    return () => {
      mediaQuery.removeEventListener("change", (e) =>
        setColor(e.matches ? "dark" : "light")
      );
    };
  }, []);

  return color;
}
