import { onMount, createSignal, Show } from 'solid-js';

function UploadImage() {
  const [generatedUrl, setGeneratedUrl] = createSignal('');
  let uploadRef;

  const onSubmit = async e => {
    e.preventDefault();
    e.stopPropagation();

    if (!uploadRef) return;

    const form = new FormData();
    form.append('file', uploadRef.files[0]);

    try {
      const response = await fetch('/i', {
        method: 'POST',
        body: form,
      });
      const hash = await response.text();
      const createdURL = import.meta.env.DEV
        ? `http://127.0.0.1:8787/i/${hash}`
        : `https://utlz.sfns.workers.dev/i/${hash}`;

      setGeneratedUrl(createdURL);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Show when={!generatedUrl()}>
        <form onSubmit={onSubmit}>
          <label
            class="block mb-2 text-sm font-medium text-gray-900"
            for="file_input"
          >
            Upload file
          </label>
          <input
            class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50  focus:outline-none"
            id="file_input"
            type="file"
            ref={uploadRef}
            required
            accept=".jpeg, .jpg, .png"
          />
          <p class="mt-1 text-sm text-gray-500" id="file_input_help">
            PNG, JPG or JPEG
          </p>
          <div class="mt-4">
            <button
              type="submit"
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >
              Upload
            </button>
          </div>
        </form>
      </Show>
      <Show when={generatedUrl()}>
        <div class="mb-3">
          <img src={generatedUrl()} class="max-w-lg" />
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

export default UploadImage;
