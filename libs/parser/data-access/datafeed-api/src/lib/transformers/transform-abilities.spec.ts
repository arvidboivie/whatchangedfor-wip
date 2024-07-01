import { AbilityChanges } from '../types/patch-response.interface';
import { transformAbilities } from './transform-abilities';

describe('transformAbilities', () => {
  const abilities: AbilityChanges[] = [
    {
      ability_id: 1,
      ability_notes: [
        { note: 'This is a note' },
        { note: 'This is another note' },
      ],
    },
    {
      ability_id: 2,
      ability_notes: [{ note: 'This is a note' }],
    },
  ];

  it(`should transform abilities`, () => {
    expect(transformAbilities(abilities)).toEqual([
      {
        name: `1`,
        changes: ['This is a note', 'This is another note'],
      },
      {
        name: `2`,
        changes: ['This is a note'],
      },
    ]);
  });

  it(`should return an empty array if no abilities are provided`, () => {
    expect(transformAbilities([])).toEqual([]);
  });

  it(`should return an empty array if no abilities are provided`, () => {
    expect(transformAbilities(undefined)).toEqual([]);
  });
});
