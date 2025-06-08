import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import { RootState, AppDispatch } from '../store'
import { createNote } from '../slices/noteSlice'
import Button from '../components/UI/Button'
import Input from '../components/UI/Input'

export default function NotesPage() {
  const dispatch = useDispatch<AppDispatch>()
  const notes = useSelector((state: RootState) => state.note.data)
  const loading = useSelector((state: RootState) => state.note.loading)
  const [title, setTitle] = useState('')

  const handleCreate = () => {
    if (!title.trim()) return
    dispatch(createNote({ title }))
    setTitle('')
  }

  return (
    <div className="h-full w-full p-6 overflow-y-auto bg-gray-50 dark:bg-zinc-900">
      <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-zinc-100">Le tue Note</h1>
      <div className="flex items-center gap-2 mb-6">
        <Input placeholder="Nuova nota" value={title} onChange={(e) => setTitle(e.target.value)} />
        <Button onClick={handleCreate} disabled={loading}>
          Aggiungi
        </Button>
      </div>
      <ul className="space-y-3">
        {notes.map((n) => (
          <li
            key={n.id}
            className="p-3 bg-white dark:bg-zinc-800 rounded-lg shadow flex flex-col gap-1"
          >
            <span className="font-semibold text-gray-800 dark:text-zinc-100">{n.title}</span>
            {n.content && (
              <span className="text-sm text-gray-600 dark:text-zinc-400 truncate">{n.content}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
