import { DotaData } from '@whatchangedfor-2/parser/feature/dota-data';

console.log('Hello World');

async function parse() {
  const data = new DotaData();

  const changes = await data.changes();

  console.log(changes);
}

parse();
