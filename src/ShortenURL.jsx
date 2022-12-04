import { createSignal, batch, Switch, Match, Show } from 'solid-js';

function ShortenURL() {
  const [url, setUrl] = createSignal('');
  const [generatedUrl, setGeneratedUrl] = createSignal('');

  const onSubmit = async e => {
    e.preventDefault();
    e.stopPropagation();

    try {
      const response = await fetch('/u', {
        method: 'POST',
        body: JSON.stringify({ url: url() }),
      });
      const hash = await response.text();
      const createdURL = import.meta.env.DEV
        ? `http://127.0.0.1:8787/u/${hash}`
        : `https://utlz.sfns.workers.dev/u/${hash}`;

      setGeneratedUrl(createdURL);
      setUrl('');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Show when={!generatedUrl()}>
        <form onSubmit={onSubmit}>
          <div class="mb-4">
            <label
              for="url"
              class="block mb-2 text-sm font-medium text-gray-900"
            >
              URL
            </label>
            <input
              type="text"
              id="url"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="https://www.patterns.dev/about/"
              required
              value={url()}
              onChange={e => setUrl(e.target.value)}
            />
          </div>
          <button
            type="submit"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            Shorten
          </button>
        </form>
      </Show>
      <Show when={generatedUrl()}>
        <div class="mb-3">
          <a
            href={generatedUrl()}
            target="_blank"
            class="text-blue-600 font-semibold hover:underline"
          >
            {generatedUrl}
          </a>
        </div>
        <button
          type="submit"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          onClick={() => setGeneratedUrl('')}
        >
          New
        </button>
      </Show>
    </>
  );
}

export default ShortenURL;
