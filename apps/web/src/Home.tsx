import { type Component } from 'solid-js';

const Home: Component = () => {
  return (
    <div class="patch">
      <p class="title">Dota 2 change tracker</p>
      <div class="section">
        <p class="subtitle">Changelogs for individual heroes and items</p>
        <p class="list-item">Easily find what changed for an item or hero</p>
        <p class="list-item">
          Use the search box above to find what you're looking for
        </p>
        <p class="list-item">
          Check out what changed for <a href="/pudge">/pudge</a>
        </p>
      </div>
    </div>
  );
};

export default Home;
