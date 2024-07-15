import { Component, Show } from 'solid-js';
import Changelog from './Changelog';
import { useParams } from '@solidjs/router';

/**
 * Wildcard routes need to be wrapped in a keyed element to re-render
 * https://docs.solidjs.com/guides/routing-and-navigation#dynamic-routes
 */
const ChangelogWildcardWrapper: Component = () => {
  const params = useParams();

  return (
    <Show when={params.name} keyed>
      <Changelog name={params.name} />
    </Show>
  );
};

export default ChangelogWildcardWrapper;
