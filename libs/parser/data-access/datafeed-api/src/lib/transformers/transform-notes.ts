import { Note } from '../types/patch-response.interface';

export function transformNotes(notes: Note[]): string[] {
  return notes.map((note) => note.note);
}
