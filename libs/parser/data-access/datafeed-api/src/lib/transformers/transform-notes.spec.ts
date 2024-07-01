import { Note } from '../types/patch-response.interface';
import { transformNotes } from './transform-notes';

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
    expect(transformNotes(exampleNotes)).toEqual([
      'This is a note',
      'This is another note',
    ]);
  });

  it(`should return an empty array if no notes are provided`, () => {
    expect(transformNotes([])).toEqual([]);
  });

  it(`should return an empty array if no notes are provided`, () => {
    expect(transformNotes(undefined)).toEqual([]);
  });
});
