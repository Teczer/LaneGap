'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  LuCheck,
  LuLoader,
  LuLogIn,
  LuPencil,
  LuPlus,
  LuStickyNote,
  LuTrash2,
  LuX,
} from 'react-icons/lu'
import type { IUserNote } from '@/lib/api/notes.api'
import type { TNotesTranslations } from '@/lib/i18n'
import { cn } from '@/lib/utils'
import { Button, Textarea } from '@/components/ui'
import { useAuthStore } from '@/app/store/auth.store'

interface IPersonalNotesProps {
  notes: IUserNote[]
  isLoading: boolean
  onAddNote: (content: string) => Promise<void>
  onUpdateNote: (noteId: string, content: string) => Promise<void>
  onDeleteNote: (noteId: string) => Promise<void>
  translations: TNotesTranslations
  title?: string
  className?: string
}

export const PersonalNotes = ({
  notes,
  isLoading,
  onAddNote,
  onUpdateNote,
  onDeleteNote,
  translations: t,
  title,
  className,
}: IPersonalNotesProps) => {
  const { isAuthenticated } = useAuthStore()

  const [isAdding, setIsAdding] = useState(false)
  const [newNote, setNewNote] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editContent, setEditContent] = useState('')
  const [isSaving, setIsSaving] = useState(false)

  const handleAddNote = async () => {
    if (!newNote.trim()) return
    setIsSaving(true)
    try {
      await onAddNote(newNote.trim())
      setNewNote('')
      setIsAdding(false)
    } finally {
      setIsSaving(false)
    }
  }

  const handleUpdateNote = async (noteId: string) => {
    if (!editContent.trim()) return
    setIsSaving(true)
    try {
      await onUpdateNote(noteId, editContent.trim())
      setEditingId(null)
      setEditContent('')
    } finally {
      setIsSaving(false)
    }
  }

  const handleDeleteNote = async (noteId: string) => {
    setIsSaving(true)
    try {
      await onDeleteNote(noteId)
    } finally {
      setIsSaving(false)
    }
  }

  const startEditing = (note: IUserNote) => {
    setEditingId(note.id)
    setEditContent(note.content)
  }

  // Not authenticated - show login prompt
  if (!isAuthenticated) {
    return (
      <div
        className={cn('rounded-xl border border-dashed border-white/10 bg-white/2 p-6', className)}
      >
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="bg-primary-muted flex h-12 w-12 items-center justify-center rounded-full">
            <LuStickyNote className="text-primary-light h-6 w-6" />
          </div>
          <div>
            <p className="font-medium text-white/80">{t.myNotes}</p>
            <p className="mt-1 text-sm text-white/40">{t.loginToAdd}</p>
          </div>
          <Link href="/auth">
            <Button variant="secondary" size="sm" className="mt-2">
              <LuLogIn className="h-4 w-4" />
              Sign in
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className={cn('rounded-xl border border-white/10 bg-white/3 p-4', className)}>
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <LuStickyNote className="text-primary-light h-5 w-5" />
          <h3 className="font-semibold text-white">{title || t.myNotes}</h3>
        </div>
        {!isAdding && (
          <Button variant="secondary" size="sm" onClick={() => setIsAdding(true)}>
            <LuPlus className="h-4 w-4" />
            {t.addNote}
          </Button>
        )}
      </div>

      {/* Add Note Form */}
      {isAdding && (
        <div className="mb-4 rounded-lg border border-white/6 bg-white/3 p-3">
          <Textarea
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder={t.placeholder}
            className="min-h-[80px] resize-none border-0 bg-transparent px-0 py-0 text-sm leading-relaxed focus:ring-0 focus-visible:ring-0"
            autoFocus
          />
          <div className="mt-2 flex justify-end gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setIsAdding(false)
                setNewNote('')
              }}
            >
              <LuX className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              onClick={handleAddNote}
              disabled={!newNote.trim()}
              isLoading={isSaving}
            >
              <LuCheck className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Notes List */}
      {isLoading ? (
        <div className="flex items-center justify-center py-8">
          <LuLoader className="text-primary-light h-6 w-6 animate-spin" />
        </div>
      ) : notes.length === 0 ? (
        <div className="py-8 text-center">
          <p className="text-white/40">{t.empty}</p>
          <p className="mt-1 text-sm text-white/30">{t.emptyHint}</p>
        </div>
      ) : (
        <div className="space-y-3">
          {notes.map((note) => (
            <div
              key={note.id}
              className="group rounded-lg border border-white/5 bg-white/2 p-3 transition-colors hover:border-white/10"
            >
              {editingId === note.id ? (
                // Edit mode
                <div>
                  <Textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    className="min-h-[60px] resize-none border-0 bg-transparent px-0 py-0 text-sm leading-relaxed focus:ring-0 focus-visible:ring-0"
                    autoFocus
                  />
                  <div className="mt-2 flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setEditingId(null)
                        setEditContent('')
                      }}
                    >
                      <LuX className="h-3 w-3" />
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleUpdateNote(note.id)}
                      disabled={!editContent.trim()}
                      isLoading={isSaving}
                    >
                      <LuCheck className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ) : (
                // View mode
                <div className="flex items-start justify-between gap-2">
                  <p className="flex-1 text-sm whitespace-pre-wrap text-white/80">{note.content}</p>
                  <div className="flex shrink-0 gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => startEditing(note)}
                      className="h-8 w-8 p-0"
                    >
                      <LuPencil className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteNote(note.id)}
                      className="hover:bg-danger/10 hover:text-danger h-8 w-8 p-0"
                    >
                      <LuTrash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
