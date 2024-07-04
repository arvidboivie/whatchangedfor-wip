import { Note } from '../types/patch-response.interface';

export const transformNote = (note: Note): string => note.note;
