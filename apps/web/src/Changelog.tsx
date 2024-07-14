import { useParams } from '@solidjs/router';
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

const Changelog: Component = () => {
  const params = useParams();
  // TODO: This isn't actually Change[], it's Change[] turned to JSON (i.e. not Dates but strings)
  const [data] = createResource(`changes/${params.name}`, fetchJson<Change[]>);

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
                <h2>
                  {item.patch} - {` `}
                  <i>{new Date(item.patchDate).toLocaleDateString()}</i>
                </h2>
                <Show when={item.facets}>
                  <h3>Facets</h3>
                  <For each={item.facets}>
                    {(facet) => (
                      <div>
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
                <SimpleChangeList
                  changes={item.general}
                  title="General changes"
                />
                <AbilityChangeList abilities={item.abilities} />
                <SimpleChangeList changes={item.talents} title="Talents" />
              </div>
            )}
          </For>
        </Match>
      </Switch>
    </div>
  );
};

export default Changelog;
