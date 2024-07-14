import { Change } from '@whatchangedfor-2/changeset';
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

  const index = changeArray.map(([key]) => ({
    name: key,
    slug: slugify(key),
  }));

  try {
    writeFileSync(`${absoluteDirectory}/index.json`, JSON.stringify(index), {
      flag: 'w+',
    });
    // file written successfully
  } catch (err) {
    console.error(err);
  }

  return index.map(({ name, slug }) => `${name}: ${slug}`);
};
