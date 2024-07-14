import { Component, For, Show } from 'solid-js';

const SimpleChangeList: Component<{ changes?: string[]; title: string }> = (
  props
) => {
  return (
    <Show when={props.changes && props.changes?.length > 0}>
      <h3>{props.title}</h3>
      <ul>
        <For each={props.changes}>{(change) => <li>{change}</li>}</For>
      </ul>
    </Show>
  );
};

export default SimpleChangeList;
