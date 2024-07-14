import { DataIndex } from '@whatchangedfor-2/shared-models-changeset';
import { fetchJson } from '@whatchangedfor-2/web/data-access/fetch-json';
import {
  createResource,
  For,
  Match,
  Show,
  Switch,
  type Component,
} from 'solid-js';

const Home: Component = () => {
  const [data] = createResource('index', fetchJson<DataIndex[]>);

  return (
    <div>
      <Show when={data.loading}>
        <p>Loading data...</p>
      </Show>
      <Switch>
        <Match when={data.error}>
          <span>Unable to load data</span>
        </Match>
        <Match when={data()}>
          <For each={data()} fallback={<div>Loading list...</div>}>
            {(item) => (
              <div>
                <p>
                  <a href={`/${item.slug}`}>{item.name}:</a> -{' '}
                  <i>{item.type}</i>
                </p>
              </div>
            )}
          </For>
        </Match>
      </Switch>
    </div>
  );
};

export default Home;
