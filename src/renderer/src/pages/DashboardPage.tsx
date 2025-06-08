import { useSelector } from 'react-redux'
import { RootState } from '../store'
import { differenceInDays, parseISO } from 'date-fns'
import KanbanBarChart from '../components/KanbanBarChart'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStickyNote, faLock, faCheckSquare } from '@fortawesome/free-solid-svg-icons'

function countTasksClosedThisWeek(tasks: any[]) {
  const now = new Date()
  return tasks.filter((t) => t.completedAt && differenceInDays(now, parseISO(t.completedAt)) <= 7)
    .length
}

export default function Dashboard() {
  const notes = useSelector((state: RootState) => state.note.data)
  const passwords = useSelector((state: RootState) => state.password.data)
  const tasks = useSelector((state: RootState) => state.task.data)
  const kanbanColumns = useSelector((state: RootState) => state.kanbanColumn.data)

  const closedThisWeek = countTasksClosedThisWeek(tasks)

  // Preparo dati per il grafico: un array [{ name: 'Todo', value: 3 }, ...]
  const taskCountPerColumn = kanbanColumns.map((col) => ({
    name: col.name,
    value: tasks.filter((t) => t.kanbanColumnId === col.id).length
  }))

  return (
    <div className="h-full w-full bg-gray-100 dark:bg-zinc-900 p-6 select-none">
      <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-zinc-100 mb-8">Dashboard</h1>
      <div className="w-full max-w-5xl mx-auto py-10 grid grid-cols-1 sm:grid-cols-3 gap-7">
        <div
          className="
          shadow-md rounded-lg
          bg-white dark:bg-zinc-800
          text-gray-800 dark:text-zinc-100
          p-5 flex flex-col items-start justify-center min-h-[100px]
          transition-all duration-300 hover:shadow-lg hover:scale-105 border-l-4 border-blue-500"
        >
          <span className="text-md text-gray-500 dark:text-gray-300 mb-2 uppercase tracking-wider flex items-center">
            <FontAwesomeIcon icon={faStickyNote} className="mr-2 text-blue-400 dark:text-blue-300" />
            Note Totali
          </span>
          <span className="text-3xl font-bold tracking-tight">{notes.length}</span>
        </div>
        <div
          className="
          shadow-md rounded-lg
          bg-white dark:bg-zinc-800
          text-gray-800 dark:text-zinc-100
          p-5 flex flex-col items-start justify-center min-h-[100px]
          transition-all duration-300 hover:shadow-lg hover:scale-105 border-l-4 border-green-500"
        >
          <span className="text-md text-gray-500 dark:text-gray-300 mb-2 uppercase tracking-wider flex items-center">
            <FontAwesomeIcon icon={faLock} className="mr-2 text-green-400 dark:text-green-300" />
            Password Salvate
          </span>
          <span className="text-3xl font-bold tracking-tight">{passwords.length}</span>
        </div>
        <div
          className="
          shadow-md rounded-lg
          bg-white dark:bg-zinc-800
          text-gray-800 dark:text-zinc-100
          p-5 flex flex-col items-start justify-center min-h-[100px]
          transition-all duration-300 hover:shadow-lg hover:scale-105 border-l-4 border-purple-500"
        >
          <span className="text-md text-gray-500 dark:text-gray-300 mb-2 uppercase tracking-wider flex items-center">
            <FontAwesomeIcon icon={faCheckSquare} className="mr-2 text-purple-400 dark:text-purple-300" />
            Task chiusi ultimi 7 giorni
          </span>
          <span className="text-3xl font-bold tracking-tight">{closedThisWeek}</span>
        </div>
      </div>

      {/* -------- GRAFICO A BARRE (edifici) -------- */}
      <KanbanBarChart data={taskCountPerColumn} isDark={true} />
    </div>
  )
}