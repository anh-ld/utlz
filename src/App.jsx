import { createSignal, batch, For, Switch, Match } from 'solid-js';
import ShortenURL from './ShortenURL';
import UploadImage from './UploadImage';

const tabs = {
  'Shorten URL': ShortenURL,
  'Upload Image': UploadImage,
};

function App() {
  const [tab, setTab] = createSignal(Object.keys(tabs)[0]);

  return (
    <>
      <header>
        <nav class="text-sm font-medium text-center border-b border-gray-200">
          <ul class="flex">
            <For each={Object.keys(tabs)}>
              {item => (
                <li
                  class={`mr-2 inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:cursor-pointer ${
                    item === tab()
                      ? 'text-blue-600 border-blue-600'
                      : 'text-gray-500 hover:text-gray-600 hover:border-gray-300'
                  }`}
                  onClick={() => setTab(item)}
                >
                  {item}
                </li>
              )}
            </For>
          </ul>
        </nav>
      </header>
      <main class="p-4">
        <Switch>
          <For each={Object.keys(tabs)}>
            {item => <Match when={item === tab()}>{tabs[item]}</Match>}
          </For>
        </Switch>
      </main>
    </>
  );
}

export default App;
