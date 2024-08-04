import { Navigate } from '@solidjs/router';
import { Change } from '@whatchangedfor-2/shared-models-changeset';
import { fetchJson } from '@whatchangedfor-2/web/data-access/fetch-json';
import {
  createResource,
  For,
  Match,
  Show,
  Switch,
  type Component,
} from 'solid-js';
import SimpleChangeList from './SimpleChangeList';
import AbilityChangeList from './AbilityChangeList';

const Changelog: Component<{ name: string }> = ({ name }) => {
  // TODO: This isn't actually Change[], it's Change[] turned to JSON (i.e. not Dates but strings)
  const [data] = createResource(`changes/${name}`, fetchJson<Change[]>);

  return (
    <div>
      <Show when={data.loading}>
        <p>Loading data...</p>
      </Show>
      <Switch>
        <Match when={data.error}>
          <Navigate href="/" />
        </Match>
        <Match when={data()}>
          <For each={data()?.reverse()} fallback={<div>Loading list...</div>}>
            {(item) => (
              <div x-name="Patch">
                <h2 class="title">
                  {item.patch} - {new Date(item.patchDate).toLocaleDateString()}
                </h2>
                <div x-name="Facets">
                  <Show when={item.facets}>
                    <h3>Facets</h3>
                    <For each={item.facets}>
                      {(facet) => (
                        <div x-name="Single Facet">
                          <h4>{facet.name}</h4>
                          <SimpleChangeList
                            changes={facet.changes}
                            title={facet.name}
                          />
                          <AbilityChangeList abilities={facet.abilityChanges} />
                        </div>
                      )}
                    </For>
                  </Show>
                </div>
                <div x-name="General Changes">
                  <SimpleChangeList
                    changes={item.general}
                    title="General changes"
                  />
                </div>
                <div x-name="Abilities">
                  <h3>Abilities</h3>
                  <AbilityChangeList abilities={item.abilities} />
                </div>
                <div x-name="Talents">
                  <SimpleChangeList changes={item.talents} title="Talents" />
                </div>
              </div>
            )}
          </For>
        </Match>
      </Switch>
    </div>
  );
};

export default Changelog;
