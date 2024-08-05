import { Component, For, Show } from 'solid-js';

const SimpleChangeList: Component<{ changes?: string[]; title?: string }> = (
  props
) => {
  return (
    <Show when={props.changes && props.changes?.length > 0}>
      <For each={props.changes}>
        {(change) => <p class="list-item">{change}</p>}
      </For>
    </Show>
  );
};

export default SimpleChangeList;
