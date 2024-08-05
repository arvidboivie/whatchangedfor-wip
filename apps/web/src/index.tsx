/* @refresh reload */
import './style.css';
import { render } from 'solid-js/web';
import { Route, Router, useLocation, useNavigate } from '@solidjs/router';
import Home from './Home';
import { createEffect, createResource, Match, Switch } from 'solid-js';
import { fetchJson } from '@whatchangedfor-2/web/data-access/fetch-json';
import { DataIndex } from '@whatchangedfor-2/shared-models-changeset';
import { createOptions, Select } from '@thisbeyond/solid-select';
import '@thisbeyond/solid-select/style.css';
import ChangelogWildcardWrapper from './ChangelogWIldcardWrapper';
import { createStore } from 'solid-js/store';

const root = document.getElementById('root');

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?'
  );
}

const App = (props: any) => {
  const [data] = createResource('index', fetchJson<DataIndex[]>);

  const [store, setStore] = createStore({
    pageName: 'Dota 2 Changelogs',
  });

  createEffect(() => {
    const location = useLocation();
    setStore('pageName', location.pathname);
  });

  const navigate = useNavigate();

  return (
    <>
      <div class="container">
        <p class="header">{store.pageName}</p>

        <div>
          <Switch>
            <Match when={data.error}>
              <span>Unable to load data</span>
            </Match>
            <Match when={data()}>
              <Select
                autofocus
                {...createOptions(data.latest ?? [], { key: 'name' })}
                onChange={(value: DataIndex) => {
                  navigate(`/${value.slug}`);
                }}
              />
            </Match>
          </Switch>
        </div>
        {props.children}
      </div>
    </>
  );
};

render(
  () => (
    <Router root={App}>
      <Route path="/" component={Home} />
      <Route path="/*name" component={ChangelogWildcardWrapper} />
    </Router>
  ),
  root!
);
