/* @refresh reload */
import { render } from 'solid-js/web';
import { Route, Router } from '@solidjs/router';
import Home from './Home';
import Changelog from './Changelog';

const root = document.getElementById('root');

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?'
  );
}

const App = (props: any) => (
  <>
    <h1>Site Title</h1>
    {props.children}
  </>
);

render(
  () => (
    <Router root={App}>
      <Route path="/" component={Home} />
      <Route path="/*name" component={Changelog} />
    </Router>
  ),
  root!
);
