import { useSelector } from 'react-redux'
import { RootState } from '../store'
import { differenceInDays, parseISO } from 'date-fns'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts/es6'
import KanbanBarChart from './KanbanBarChart'

function countTasksClosedThisWeek(tasks: any[]) {
  const now = new Date()
  return tasks.filter((t) => t.completedAt && differenceInDays(now, parseISO(t.completedAt)) <= 7).length
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
    value: tasks.filter((t) => t.kanbanColumnId === col.id).length,
  }))

  return (
    <div className="h-full w-full dark:bg-gray-800 bg-gray-50 p-6 select-none">
      <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-zinc-100">Dashboard</h1>
      <div className="w-full max-w-5xl mx-auto py-10 grid grid-cols-1 sm:grid-cols-3 gap-7">
        <div
          className="
          border-l-4 shadow-md
          border-blue-600 dark:border-violet-500
          bg-white dark:bg-zinc-900
          text-gray-800 dark:text-zinc-100
          rounded-md
          border-r border-t border-b
          p-5 flex flex-col items-start justify-center min-h-[90px]">
          <span className="text-md text-gray-700 dark:text-zinc-200 mb-1 uppercase tracking-wider">
            Note Totali
          </span>
          <span className="text-2xl font-bold tracking-tight">{notes.length}</span>
        </div>
        <div
          className="
          border-l-4 rounded-md shadow-md
          border-blue-600 dark:border-violet-500
          bg-white dark:bg-zinc-900
          text-gray-800 dark:text-zinc-100
          border-r border-t border-b
          p-5 flex flex-col items-start justify-center min-h-[90px]">
          <span className="text-md text-gray-700 dark:text-zinc-200 mb-1 uppercase tracking-wider">
            Password Salvate
          </span>
          <span className="text-2xl font-bold tracking-tight">{passwords.length}</span>
        </div>
        <div
          className="
          border-l-4 rounded-md shadow-md
          border-blue-600 dark:border-violet-500
          bg-white dark:bg-zinc-900
          text-gray-800 dark:text-zinc-100
          border-r border-t border-b
          p-5 flex flex-col items-start justify-center min-h-[90px]">
          <span className="text-md text-gray-700 dark:text-zinc-200 mb-1 uppercase tracking-wider">
            Task chiusi ultimi 7 giorni
          </span>
          <span className="text-2xl font-bold tracking-tight">{closedThisWeek}</span>
        </div>
      </div>

      {/* -------- GRAFICO A BARRE (edifici) -------- */}
       <KanbanBarChart data={taskCountPerColumn} isDark={true} />
    </div>
  )
}
