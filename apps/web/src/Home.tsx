import {
  createResource,
  For,
  Match,
  Show,
  Switch,
  type Component,
} from 'solid-js';

const fetchData = async () => {
  const response = await fetch('http://127.0.0.1:5500/files/index.json');
  const data = await response.json();
  return data;
};

const Home: Component = () => {
  const [data] = createResource(fetchData);

  return (
    <div>
      <Show when={data.loading}>
        <p>Loading data...</p>
      </Show>
      <Switch>
        <Match when={data.error}>
          <span>Error: {error()}</span>
        </Match>
        <Match when={data()}>
          <For each={data()} fallback={<div>Loading list...</div>}>
            {(item) => (
              <div>
                <p>
                  {item.type} - <b>{item.name}:</b> {item.slug}
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
