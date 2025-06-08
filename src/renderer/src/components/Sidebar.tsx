import { NavLink } from 'react-router-dom'
import { FaHome, FaStickyNote, FaKey, FaTrello } from 'react-icons/fa'

const routes = [
  { label: 'Dashboard', to: '/', icon: FaHome },
  { label: 'Note', to: '/note', icon: FaStickyNote },
  { label: 'Password', to: '/password', icon: FaKey },
  { label: 'Kanban', to: '/kanban', icon: FaTrello }
]

export default function Sidebar() {
  return (
    <nav
      className="
        h-full w-48 min-w-[12%] border-r flex flex-col shadow-md
        bg-gradient-to-b from-gray-100 to-gray-50 text-gray-800 border-gray-200
        dark:from-zinc-900 dark:to-zinc-800 dark:text-zinc-100 dark:border-zinc-800
        transition-colors
      "
      style={{
        fontFamily: `'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace`,
        fontSize: '15px',
        letterSpacing: '-0.01em'
      }}
    >
      {routes.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          end
          className={({ isActive }) =>
            [
              'flex items-center gap-2 px-3 py-2 text-sm font-medium border-l-4 transition-all duration-100 select-none',
              isActive
                ? 'border-blue-600 bg-blue-100 text-blue-700 dark:border-violet-500 dark:bg-zinc-800 dark:text-violet-300'
                : 'border-transparent hover:bg-blue-50 hover:text-blue-700 dark:hover:bg-zinc-800 dark:hover:text-violet-200'
            ].join(' ')
          }
        >
          <Icon className="w-4 h-4" />
          {label}
        </NavLink>
      ))}
      <hr className="dark:border-violet-500 border-blue-600" />
    </nav>
  )
}
