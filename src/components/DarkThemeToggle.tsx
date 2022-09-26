import { FC } from "react";

import { useTheme } from "next-themes";

export const DarkModeToggle: FC = () => {
  const { theme, setTheme } = useTheme();

  return (
    <>
      {" "}
      <select
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2.5 py-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        onChange={e =>
          e.target.value === "dark" ? setTheme("dark") : setTheme("light")
        }
        value={theme === "dark" ? "dark" : "light"}
      >
        <option value="dark">Dark</option>
        <option value="light">Light</option>
      </select>
    </>
  );
};
