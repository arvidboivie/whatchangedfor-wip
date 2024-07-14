import { useParams } from '@solidjs/router';
import {
  createResource,
  For,
  Match,
  Show,
  Switch,
  type Component,
} from 'solid-js';

const fetchData = async (name: string) => {
  const response = await fetch(
    `http://127.0.0.1:5500/files/changes/${name}.json`
  );
  const data = await response.json();
  return data;
};

const Changelog: Component = () => {
  const params = useParams();
  const [data] = createResource(params.name, fetchData);

  return (
    <div>
      <Show when={data.loading}>
        <p>Loading data...</p>
      </Show>
      <Switch>
        <Match when={data.error}>
          <span>Error: {data.error()}</span>
        </Match>
        <Match when={data()}>
          <For each={data()} fallback={<div>Loading list...</div>}>
            {(item) => (
              <div>
                <p>
                  <b>{item.patch}:</b>{' '}
                  {new Date(item.patchDate).toLocaleDateString()}
                </p>
                <For each={item.talents}>
                  {(talent) => (
                    <p>
                      <b>{talent}</b>
                    </p>
                  )}
                </For>
              </div>
            )}
          </For>
        </Match>
      </Switch>
    </div>
  );
};

export default Changelog;
