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
                <p class="title">
                  {item.patch} - {new Date(item.patchDate).toLocaleDateString()}
                </p>
                <div class="facets">
                  <Show when={item.facets}>
                    <p>Facets</p>
                    <For each={item.facets}>
                      {(facet) => (
                        <div class="facet">
                          <p>{facet.name}</p>
                          <SimpleChangeList changes={facet.changes} />
                          <Show
                            when={
                              facet.abilityChanges &&
                              facet.abilityChanges.length > 0
                            }
                          >
                            <For each={facet.abilityChanges}>
                              {(change) => (
                                <div>
                                  <p>{change.name}</p>
                                  <SimpleChangeList changes={change.changes} />
                                </div>
                              )}
                            </For>
                          </Show>
                        </div>
                      )}
                    </For>
                  </Show>
                </div>
                <Show when={item.general && item.general.length > 0}>
                  <p>General Changes</p>
                  <div class="general-changes">
                    <SimpleChangeList changes={item.general} />
                  </div>
                </Show>
                <Show when={item.abilities && item.abilities.length > 0}>
                  <div class="abilities">
                    <p>Abilities</p>
                    <For each={item.abilities}>
                      {(ability) => (
                        <div>
                          <p>{ability.name}</p>
                          <SimpleChangeList changes={ability.changes} />
                        </div>
                      )}
                    </For>
                  </div>
                </Show>
                <Show when={item.talents && item.talents.length > 0}>
                  <div class="talents">
                    <p>Talents</p>
                    <SimpleChangeList changes={item.talents} />
                  </div>
                </Show>
              </div>
            )}
          </For>
        </Match>
      </Switch>
    </div>
  );
};

export default Changelog;
