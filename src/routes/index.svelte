<script lang="ts">
  import TextArea from '$lib/components/TextArea.svelte';
  import ImagePreview from '$lib/components/ImagePreview.svelte';
  import { useMachine } from '$lib/hooks/useMachine';
  import { formMachine, IFormEvent } from '$lib/store';

  const { send, state } = useMachine(formMachine);

  let htmlTextArea: HTMLTextAreaElement;
  let htmlCopied = false;

  function getHtml(state) {
    return `<img src="${state.context.url}" alt="${state.context.alt}" ${
      state.context.width ? `width="${state.context.width}"` : ''
    } ${state.context.height ? `height="${state.context.height}"` : ''} />`;
  }

  function handleInput(event: Event) {
    const target = event.target as HTMLInputElement;

    send('INPUT_CHANGE', { value: target.value });
  }

  function handleBlur() {
    send('LOST_FOCUS');
  }

  function handleFocus(event: IFormEvent) {
    return () => {
      send(event);
    };
  }

  async function handleCopyHtml() {
    htmlTextArea.select();

    await navigator.clipboard.writeText(htmlTextArea.value);
    htmlCopied = true;

    setTimeout(() => {
      htmlCopied = false;
    }, 10000);
  }

  $: htmlString = getHtml($state);
</script>

<main class="container max-w-screen-md mx-auto h-full">
  <h1>Markdown to HTML Image Parser</h1>

  <div class="flex flex-col justify-between">
    <h2 class="mb-4 text-2xl">Markup</h2>
    <div>
      <label for="" class="mb-2">Markdown</label>
      <TextArea
        value={$state.context.markdown}
        rows={2}
        on:focus={handleFocus('FOCUS_MARKDOWN')}
        on:input={handleInput}
        on:blur={handleBlur}
      />
    </div>

    <div class="mt-4">
      <div class="relative">
        <label for="" class="mb-2">HTML</label>
        <TextArea value={htmlString} readonly bind:ref={htmlTextArea} />
        <button
          class={`absolute right-0 bottom-2 px-2 py-2 bg ${htmlCopied ? 'text-green-400' : ''}`}
          on:click={handleCopyHtml}
        >
          {#if htmlCopied}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
              />
            </svg>
          {:else}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
          {/if}
        </button>
      </div>
      <div class="mt-4 grid place-items-center">
        <ImagePreview html={htmlString} />
      </div>
    </div>
  </div>

  <hr class="my-6" />

  <div>
    <h2 class="mb-4 text-2xl">Image Meta Information</h2>
    <div class="grid grid-cols-12 gap-4">
      <fieldset class="col-span-12 grid grid-cols-12">
        <label for="" class="col-span-12 flex items-center">URL (src)</label>
        <input
          type="text"
          class="col-span-12"
          value={$state.context.url}
          on:focus={handleFocus('FOCUS_URL')}
          on:input={handleInput}
          on:blur={handleBlur}
        />
      </fieldset>
      <fieldset class="col-span-12 grid grid-cols-12">
        <label for="" class="col-span-12 flex items-center">Description (alt)</label>
        <input
          type="text"
          class="col-span-12"
          value={$state.context.alt}
          on:focus={handleFocus('FOCUS_ALT')}
          on:input={handleInput}
          on:blur={handleBlur}
        />
      </fieldset>
      <fieldset class="col-span-12 sm:col-span-6 grid grid-cols-12">
        <label for="" class="col-span-12 flex items-center">Width</label>
        <input
          type="number"
          class="col-span-12"
          value={$state.context.width}
          on:focus={handleFocus('FOCUS_WIDTH')}
          on:input={handleInput}
          on:blur={handleBlur}
        />
      </fieldset>
      <fieldset class="col-span-12 sm:col-span-6 grid grid-cols-12">
        <label for="" class="col-span-12 flex items-center">Height</label>
        <input
          type="number"
          class="col-span-12"
          value={$state.context.height}
          on:focus={handleFocus('FOCUS_HEIGHT')}
          on:input={handleInput}
          on:blur={handleBlur}
        />
      </fieldset>
    </div>
  </div>
</main>

<style lang="postcss" global>
  main {
    @apply px-4 md:px-0;
  }

  body {
    @apply py-10;
  }

  h1 {
    @apply text-4xl md:text-5xl font-bold text-center;
    @apply mb-10;
  }

  textarea:read-only {
    background-color: hsl(210deg 8% 18%);
    @apply cursor-text;
  }

  input,
  textarea {
    @apply rounded;
    @apply py-2 px-4;
    background-color: hsl(210deg 31% 27%);
  }

  label {
    @apply text-gray-300 mb-2 block italic;
  }
</style>
