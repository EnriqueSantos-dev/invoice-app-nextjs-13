import { useEffect, useState } from "react";
import usePreferencesColor from "./usePreferencesColor";
import useLocalStorage from "./useLocalStorage";

export default function useToggleTheme() {
  const [theme, setTheme] = useState<"dark" | "light" | null>(null);
  const preferencesColorSchemaUser = usePreferencesColor();
  const [storageTheme, setStorageTheme] = useLocalStorage({
    key: "@invoice_app.theme",
  });

  function toggleTheme() {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  }

  useEffect(() => {
    if (storageTheme && !theme) {
      setTheme(storageTheme);
      return;
    }

    if (preferencesColorSchemaUser && !theme && !storageTheme) {
      setTheme(preferencesColorSchemaUser);
      setStorageTheme(preferencesColorSchemaUser);
      return;
    }

    if (theme) {
      setStorageTheme(theme);

      const htmlClassList = document.querySelector("html")?.classList;

      if (theme === "dark") {
        htmlClassList?.add("dark");
      } else {
        htmlClassList?.remove("dark");
      }
    }
  }, [theme, storageTheme, preferencesColorSchemaUser, setStorageTheme]);

  return { theme, toggleTheme };
}
