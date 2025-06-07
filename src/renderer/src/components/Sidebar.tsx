import { NavLink } from "react-router-dom";

const routes = [
  { label: "Dashboard", to: "/" },
  { label: "Note", to: "/note" },
  { label: "Password", to: "/password" },
  { label: "Kanban", to: "/kanban" },
];

export default function Sidebar() {
  return (
    <nav
      className="
        h-full w-40 min-w-[10%] border-r flex flex-col
        bg-gray-50 text-gray-800 border-gray-200
        dark:bg-zinc-900 dark:text-zinc-100 dark:border-zinc-800
        transition-colors
      "
      style={{
        fontFamily: `'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace`,
        fontSize: "15px",
        letterSpacing: "-0.01em",
      }}
    >
      {routes.map((r) => (
        <NavLink
          key={r.to}
          to={r.to}
          end
          className={({ isActive }) =>
            [
              "text-left px-2 py-2 text-sm font-medium border-l-4 transition-all duration-100 select-none",
              isActive
                ? // Active: dark=purple, light=blue
                  "border-blue-600 bg-blue-100 text-blue-700 dark:border-violet-500 dark:bg-zinc-800 dark:text-violet-300"
                : // Hover: dark=violet-600, light=blue-100
                  "border-transparent hover:bg-blue-50 hover:text-blue-700 dark:hover:bg-zinc-800 dark:hover:text-violet-200"
            ].join(" ")
          }
        >
          {r.label}
        </NavLink>
      ))}
        <hr className="dark:border-violet-500 border-blue-600"/>
    </nav>
  );
}
