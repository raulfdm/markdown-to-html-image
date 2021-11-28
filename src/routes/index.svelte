<script lang="ts">
  import TextArea from '$lib/components/TextArea.svelte';
  import { useMachine } from '$lib/hooks/useMachine';
  import { formMachine, IFormEvent } from '$lib/store';

  const { send, state } = useMachine(formMachine);

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

  $: htmlString = getHtml($state);
</script>

<main class="container max-w-screen-md mx-auto h-screen">
  <h1>Markdown to HTML Image Parser</h1>

  <div class="flex flex-col justify-between">
    <h2 class="mb-4 text-2xl">Markup</h2>
    <div>
      <label for="" class="mb-2">Markdown</label>
      <TextArea
        value={$state.context.markdown}
        on:focus={handleFocus('FOCUS_MARKDOWN')}
        on:input={handleInput}
        on:blur={handleBlur}
      />
    </div>

    <div class="mt-4">
      <label for="" class="mb-2">HTML</label>
      <TextArea value={htmlString} disabled />
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
    @apply mb-12;
  }

  textarea:disabled {
    background-color: hsl(210deg 8% 18%);
    @apply cursor-not-allowed;
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
