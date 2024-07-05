import { PatchChangeset } from '@whatchangedfor-2/changeset';
import { Change } from './change.interface';

export function getChangesPerItem(patches: PatchChangeset[]) {
  const changesPerItem: Change[] = patches.flatMap((patch) => {
    return patch.changes.map((changeItem) => {
      let input = {
        patch: patch.version,
        patchDate: patch.timestamp,
        id: changeItem.id,
        type: changeItem.type,
        general: changeItem.notes,
      };

      if (changeItem.type === `HERO`) {
        return {
          ...input,
          abilities: changeItem.abilities,
          talents: changeItem.talents,
          facets: changeItem.facets,
        };
      }

      return input;
    });
  });

  return changesPerItem;
}
