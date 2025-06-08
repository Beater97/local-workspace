import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import { RootState, AppDispatch } from '../store'
import { createNote, fetchNotes, updateNote, deleteNote } from '../slices/noteSlice'
import { createFolder, fetchFolders, deleteFolder } from '../slices/folderSlice'
import {
  BsFiletypeAi,
  BsFolder,
  BsPlus,
  BsX,
  BsChevronRight,
  BsChevronDown,
  BsThreeDotsVertical,
  BsFolder2Open
} from 'react-icons/bs'
import TiptapEditor from '@renderer/components/Editor'
import MonacoEditorComponent from '@renderer/components/Editor'

interface Note {
  id: number
  title: string
  content?: string
  folderId?: number
  createdAt: string
  updatedAt: string
  deletedAt?: string
}

interface Folder {
  id: number
  name: string
  createdAt?: string
}

export default function NotesPage() {
  const dispatch = useDispatch<AppDispatch>()
  const notes = useSelector((state: RootState) => state.note.data)
  const folders = useSelector((state: RootState) => state.folder.data)
  const [noteContent, setNoteContent] = useState<string>('')

  // Stati principali
  const [selectedNote, setSelectedNote] = useState<Note | null>(null)
  const [expandedFolders, setExpandedFolders] = useState<Set<number>>(new Set())
  const [contextMenu, setContextMenu] = useState<{
    x: number
    y: number
    type: 'folder' | 'note'
    id: number
  } | null>(null)

  // Stati per creazione
  const [isCreatingFolder, setIsCreatingFolder] = useState(false)
  const [isCreatingNote, setIsCreatingNote] = useState<number | null>(null) // folderId o null
  const [newItemName, setNewItemName] = useState('')

  // Stato per tracciare l'ultima nota creata
  const [lastCreatedNoteTitle, setLastCreatedNoteTitle] = useState<string | null>(null)

  useEffect(() => {
    dispatch(fetchNotes())
    dispatch(fetchFolders())
  }, [dispatch])
  useEffect(() => {
    setNoteContent(selectedNote?.content || '')
  }, [selectedNote])
  // Effetto per aprire automaticamente la nota appena creata
  useEffect(() => {
    if (lastCreatedNoteTitle) {
      // Cerca la nota con il titolo appena creato
      const newNote = notes.find((note) => note.title === lastCreatedNoteTitle && !note.deletedAt)

      if (newNote) {
        setSelectedNote(newNote)
        setLastCreatedNoteTitle(null) // Reset dello stato
      }
    }
  }, [notes, lastCreatedNoteTitle])

  // Chiudi menu contestuale quando si clicca altrove
  useEffect(() => {
    const handleClick = () => setContextMenu(null)
    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  const toggleFolder = (folderId: number) => {
    const newExpanded = new Set(expandedFolders)
    if (newExpanded.has(folderId)) {
      newExpanded.delete(folderId)
    } else {
      newExpanded.add(folderId)
    }
    setExpandedFolders(newExpanded)
  }

  const handleCreateFolder = () => {
    if (!newItemName.trim()) return
    dispatch(createFolder({ name: newItemName }))
    setNewItemName('')
    setIsCreatingFolder(false)
  }

  const handleCreateNote = async (folderId?: number) => {
    if (!newItemName.trim()) return

    // Salva il titolo della nota che stai per creare
    setLastCreatedNoteTitle(newItemName)

    // Se la nota è in una cartella, assicurati che sia espansa
    if (folderId) {
      const newExpanded = new Set(expandedFolders)
      newExpanded.add(folderId)
      setExpandedFolders(newExpanded)
    }

    // Crea la nota
    dispatch(createNote({ title: newItemName, folderId }))

    setNewItemName('')
    setIsCreatingNote(null)
  }

  const handleDeleteFolder = (folderId: number) => {
    if (window.confirm('Eliminare questa cartella e tutte le sue note?')) {
      dispatch(deleteFolder(folderId))
    }
    setContextMenu(null)
  }

  const handleDeleteNote = (noteId: number) => {
    if (window.confirm('Eliminare questa nota?')) {
      dispatch(deleteNote(noteId))
    }
    setContextMenu(null)
  }

  const handleContextMenu = (e: React.MouseEvent, type: 'folder' | 'note', id: number) => {
    e.preventDefault()
    e.stopPropagation()
    setContextMenu({ x: e.clientX, y: e.clientY, type, id })
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (isCreatingFolder) {
        handleCreateFolder()
      } else if (isCreatingNote !== null) {
        handleCreateNote(isCreatingNote || undefined)
      }
    } else if (e.key === 'Escape') {
      setIsCreatingFolder(false)
      setIsCreatingNote(null)
      setNewItemName('')
    }
  }

  const activeNotes = notes.filter((note) => !note.deletedAt)

  return (
    <div className="h-full w-full flex bg-gray-50 dark:bg-zinc-900">
      <div className="w-80 bg-zinc-800 text-gray-200 flex flex-col border-r border-zinc-700">
        <div className="px-4 py-3 border-b border-zinc-700 flex items-center justify-between">
          <span className="text-sm font-medium uppercase tracking-wide text-gray-400">
            EXPLORER
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsCreatingFolder(true)}
              className="p-1 hover:bg-zinc-700 rounded transition-colors"
              title="Nuova cartella"
            >
              <BsFolder className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto py-2">
          {isCreatingFolder && (
            <div className="px-2 mb-2">
              <div className="flex items-center gap-1 px-2 py-1">
                <BsFolder className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <input
                  type="text"
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  onKeyDown={handleKeyDown}
                  onBlur={() =>
                    newItemName.trim() ? handleCreateFolder() : setIsCreatingFolder(false)
                  }
                  className="flex-1 bg-zinc-700 text-white px-2 py-1 text-sm border border-zinc-600 rounded"
                  placeholder="Nome cartella"
                  autoFocus
                />
              </div>
            </div>
          )}
          {folders.map((folder) => {
            const folderNotes = activeNotes.filter((note) => note.folderId === folder.id)
            const isExpanded = expandedFolders.has(folder.id)

            return (
              <div key={folder.id} className="select-none">
                {/* Cartella */}
                <div
                  className="flex items-center gap-1 px-2 py-1 hover:bg-zinc-700 group"
                  onClick={() => toggleFolder(folder.id)}
                  onContextMenu={(e) => handleContextMenu(e, 'folder', folder.id)}
                >
                  <button className="p-0.5">
                    {isExpanded ? (
                      <BsChevronDown className="w-3 h-3 text-gray-400" />
                    ) : (
                      <BsChevronRight className="w-3 h-3 text-gray-400" />
                    )}
                  </button>
                  {isExpanded ? (
                    <BsFolder2Open className="w-4 h-4 text-blue-400 flex-shrink-0" />
                  ) : (
                    <BsFolder className="w-4 h-4 text-blue-400 flex-shrink-0" />
                  )}
                  <span className="text-sm text-gray-200 flex-1 truncate">{folder.name}</span>
                  <span className="text-xs text-gray-500 opacity-0 group-hover:opacity-100">
                    {folderNotes.length}
                  </span>
                  <button
                    className="cursor-pointer hover:bg-zinc-600 p-1 rounded"
                    onClick={(e) => {
                      e.stopPropagation()
                      setIsCreatingNote(folder.id)
                    }}
                    title="Nuova nota"
                  >
                    <BsPlus className="w-3 h-3" />
                  </button>
                </div>

                {/* Note della cartella */}
                {isExpanded && (
                  <div className="ml-4">
                    {/* Form per nuova nota nella cartella */}
                    {isCreatingNote === folder.id && (
                      <div className="px-2 py-1">
                        <div className="flex items-center gap-1">
                          <div className="w-3" /> {/* Spacer per allineamento */}
                          <BsFiletypeAi className="w-4 h-4 text-green-400 flex-shrink-0" />
                          <input
                            type="text"
                            value={newItemName}
                            onChange={(e) => setNewItemName(e.target.value)}
                            onKeyDown={handleKeyDown}
                            onBlur={() =>
                              newItemName.trim()
                                ? handleCreateNote(folder.id)
                                : setIsCreatingNote(null)
                            }
                            className="flex-1 bg-zinc-700 text-white px-2 py-1 text-sm border border-zinc-600 rounded"
                            placeholder="Nome nota"
                            autoFocus
                          />
                        </div>
                      </div>
                    )}

                    {folderNotes.map((note) => (
                      <div
                        key={note.id}
                        className={`flex items-center gap-1 px-2 py-1 group ${
                          selectedNote?.id === note.id
                            ? 'bg-blue-600 text-white'
                            : 'hover:bg-zinc-700 text-gray-200'
                        }`}
                        onClick={() => setSelectedNote(note)}
                        onContextMenu={(e) => handleContextMenu(e, 'note', note.id)}
                      >
                        <div className="w-3" /> {/* Spacer per allineamento */}
                        <BsFiletypeAi className="w-4 h-4 text-green-400 flex-shrink-0" />
                        <span className="text-sm flex-1 truncate">{note.title}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
          {activeNotes.filter((note) => !note.folderId).length > 0 && (
            <div className="mt-4 border-t border-zinc-700 pt-2">
              {activeNotes
                .filter((note) => !note.folderId)
                .map((note) => (
                  <div
                    key={note.id}
                    className={`flex items-center gap-1 px-2 py-1 ${
                      selectedNote?.id === note.id
                        ? 'bg-blue-600 text-white'
                        : 'hover:bg-zinc-700 text-gray-200'
                    }`}
                    onClick={() => setSelectedNote(note)}
                    onContextMenu={(e) => handleContextMenu(e, 'note', note.id)}
                  >
                    <div className="w-4" /> {/* Spacer */}
                    <BsFiletypeAi className="w-4 h-4 text-green-400 flex-shrink-0" />
                    <span className="flex-1 truncate">{note.title}</span>
                  </div>
                ))}
            </div>
          )}
        </div>

        <div className="px-4 py-2 border-t border-zinc-700 text-xs text-gray-500">
          {folders.length} cartelle, {activeNotes.length} note
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center">
        {selectedNote ? (
          <div className="max-w-4xl w-full h-full flex flex-col ">
            <div className="bg-zinc-800 border-b border-zinc-700 px-4 py-2 rounded-sm">
              <div className="flex items-center gap-2">
                <BsFiletypeAi className="w-4 h-4 text-green-400" />
                <span className="text-sm text-gray-200">{selectedNote.title}</span>
                <button
                  onClick={() => setSelectedNote(null)}
                  className="ml-auto p-1 hover:bg-zinc-700 rounded"
                >
                  <BsX className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            </div>
            <div className="flex-1 bg-white dark:bg-zinc-900 py-2 px-1 overflow-y-auto">
              <div className="mx-auto h-full">
                <textarea
                  className="resize-none w-full h-full text-xl p-6 rounded-sm border border-neutral-300 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 font-mono shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize"
                  placeholder="Scrivi qui la tua nota..."
                  spellCheck={false}
                  value={noteContent}
                  onChange={(e) => setNoteContent(e.target.value)}
                  onBlur={() => {
                    if (selectedNote && noteContent !== selectedNote.content) {
                      dispatch(updateNote({ id: selectedNote.id, data: { content: noteContent } }))
                    }
                  }}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <BsFiletypeAi className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Nessuna nota selezionata
            </h2>
            <p className="text-gray-500 dark:text-gray-400">
              Seleziona una nota dall'explorer per iniziare
            </p>
          </div>
        )}
      </div>
      {contextMenu && (
        <div
          className="fixed bg-zinc-800 border border-zinc-600 rounded shadow-lg py-1 z-50 min-w-32"
          style={{ left: contextMenu.x, top: contextMenu.y }}
          onClick={(e) => e.stopPropagation()}
        >
          {contextMenu.type === 'folder' ? (
            <>
              <button
                className="w-full px-3 py-1 text-left text-sm text-gray-200 hover:bg-zinc-700"
                onClick={() => setIsCreatingNote(contextMenu.id)}
              >
                Nuova nota
              </button>
              <button
                className="w-full px-3 py-1 text-left text-sm text-red-400 hover:bg-zinc-700"
                onClick={() => handleDeleteFolder(contextMenu.id)}
              >
                Elimina cartella
              </button>
            </>
          ) : (
            <button
              className="w-full px-3 py-1 text-left text-sm text-red-400 hover:bg-zinc-700"
              onClick={() => handleDeleteNote(contextMenu.id)}
            >
              Elimina nota
            </button>
          )}
        </div>
      )}
    </div>
  )
}
