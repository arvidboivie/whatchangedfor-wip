import { DotaData } from '@whatchangedfor-2/parser/feature/dota-data';
import { persist } from '@whatchangedfor-2/parser/feature/persist';

console.log('Hello World');

async function parse() {
  const data = new DotaData();

  const changes = await data.changes();

  console.log(persist(changes, 'files'));
}

parse();
