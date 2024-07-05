import { Change } from '@whatchangedfor-2/changeset';

export function getChangeMap(changes: Change[]): Map<number, Change[]> {
  const changeMap: Map<number, Change[]> = new Map();

  changes.forEach((change) => {
    changeMap.set(change.id, [...(changeMap.get(change.id) ?? []), change]);
  });

  return changeMap;
}
