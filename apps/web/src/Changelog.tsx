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
              <div class="patch">
                <p class="title">
                  <a href={`https://www.dota2.com/patches/${item.patch}`}>
                    {item.patch}
                  </a>
                  <span class="title-right">
                    {new Date(item.patchDate).toLocaleDateString()}
                  </span>
                </p>
                <div class="section">
                  <Show when={item.facets}>
                    <p class="subtitle">Facets</p>
                    <For each={item.facets}>
                      {(facet) => (
                        <div class="facet">
                          <p class="facet-title">{facet.name}</p>
                          <SimpleChangeList changes={facet.changes} />
                          <Show
                            when={
                              facet.abilityChanges &&
                              facet.abilityChanges.length > 0
                            }
                          >
                            <For each={facet.abilityChanges}>
                              {(ability) => (
                                <div class="ability">
                                  <p class="ability-title">{ability.name}</p>
                                  <SimpleChangeList changes={ability.changes} />
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
                  <div class="section">
                    <p class="subtitle">General Changes</p>
                    <SimpleChangeList changes={item.general} />
                  </div>
                </Show>
                <Show when={item.abilities && item.abilities.length > 0}>
                  <div class="section">
                    <p class="subtitle">Abilities</p>
                    <For each={item.abilities}>
                      {(ability) => (
                        <div class="ability">
                          <p class="ability-title">{ability.name}</p>
                          <SimpleChangeList changes={ability.changes} />
                        </div>
                      )}
                    </For>
                  </div>
                </Show>
                <Show when={item.talents && item.talents.length > 0}>
                  <div class="section">
                    <p class="subtitle">Talents</p>
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
