import { AbilityChangeset } from '@whatchangedfor-2/shared-models-changeset';
import { Component, For, Show } from 'solid-js';
import SimpleChangeList from './SimpleChangeList';

const AbilityChangeList: Component<{ abilities?: AbilityChangeset[] }> = (
  props
) => {
  return (
    <Show when={props.abilities && props.abilities?.length > 0}>
      <For each={props.abilities}>
        {(ability) => (
          <SimpleChangeList changes={ability.changes} title={ability.name} />
        )}
      </For>
    </Show>
  );
};

export default AbilityChangeList;
