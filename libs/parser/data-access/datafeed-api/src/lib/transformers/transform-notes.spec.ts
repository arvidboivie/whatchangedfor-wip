import { Note } from '../types/patch-response.interface';
import { transformNote } from './transform-notes';

describe(`transformNotes`, () => {
  const exampleNotes: Note[] = [
    {
      note: 'This is a note',
    },
    {
      note: 'This is another note',
    },
  ];

  it(`should transform notes`, () => {
    expect(transformNote(exampleNotes)).toEqual([
      'This is a note',
      'This is another note',
    ]);
  });

  it(`should return an empty array if no notes are provided`, () => {
    expect(transformNote([])).toEqual([]);
  });

  it(`should return an empty array if no notes are provided`, () => {
    expect(transformNote(undefined)).toEqual([]);
  });
});
