import { NavLink } from 'react-router-dom'
import {
  AiOutlineHome,
  AiOutlineFileText,
  AiOutlineLock,
  AiOutlineUnorderedList
} from 'react-icons/ai'
import { useState } from 'react'

const routes = [
  { label: 'Dashboard', to: '/', icon: AiOutlineHome },
  { label: 'Note', to: '/note', icon: AiOutlineFileText },
  { label: 'Password', to: '/password', icon: AiOutlineLock },
  { label: 'Kanban', to: '/kanban', icon: AiOutlineUnorderedList }
]

export default function Sidebar() {
  const [expanded, setExpanded] = useState(false)

  return (
    <nav
      className="
        h-full w-16 group hover:w-48 min-w-[4rem] flex flex-col shadow-md overflow-hidden
        bg-white dark:bg-zinc-800 text-gray-800 dark:text-zinc-100 border-r
        transition-all duration-200
      "
      style={{
        fontFamily: `'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace`,
        fontSize: '15px',
        letterSpacing: '-0.01em'
      }}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
    >
      {routes.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          end
          className={({ isActive }) =>
            [
              'flex items-center gap-2 px-3 py-2 text-sm font-medium border-l-4 transition-colors duration-200 select-none',
              isActive
                ? 'border-blue-500 bg-blue-50 text-blue-700 dark:border-blue-500 dark:bg-blue-900 dark:text-blue-300'
                : 'border-transparent hover:bg-gray-100 hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-400'
            ].join(' ')
          }
        >
          <Icon className="w-8 h-8" />
          <span className={`transition-all duration-200 ${expanded ? 'w-20 px-2' : 'w-0 overflow-hidden'}`}>
            {label}
          </span>
        </NavLink>
      ))}
    </nav>
  )
}