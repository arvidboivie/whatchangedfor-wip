import { Change, DataIndex } from '@whatchangedfor-2/shared-models-changeset';
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { slugify } from './utils/slugify';

const directoryStructure = (directoryName: string) => [
  `${directoryName}`,
  `${directoryName}/changes`,
];

export const persist = (
  changeset: Map<string, Change[]>,
  directory: string
): string[] => {
  const changeArray = Array.from(changeset.entries());

  const absoluteDirectory = `${process.cwd()}/${directory}`;

  const directories = directoryStructure(absoluteDirectory);

  directories.forEach((directory) => {
    if (!existsSync(directory)) {
      mkdirSync(directory, { recursive: true });
    }
  });

  // Save individual changes
  changeArray.map(([key, value]) => {
    const path = `${absoluteDirectory}/changes/${slugify(key)}.json`;

    try {
      writeFileSync(path, JSON.stringify(value), { flag: 'w+' });
      // file written successfully
    } catch (err) {
      console.error(err);
    }

    return path;
  });

  const index: DataIndex[] = changeArray.map(([key, value]) => ({
    name: key,
    slug: slugify(key),
    type: value[0].type,
  }));

  try {
    writeFileSync(`${absoluteDirectory}/index.json`, JSON.stringify(index), {
      flag: 'w+',
    });
    // file written successfully
  } catch (err) {
    console.error(err);
  }

  return index.map(({ name, slug, type }) => `${name}: ${slug} - ${type}`);
};
