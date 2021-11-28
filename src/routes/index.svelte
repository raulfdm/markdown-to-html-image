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
    <div>
      <h3 class="mb-2">Markdown</h3>
      <TextArea
        value={$state.context.markdown}
        on:focus={handleFocus('FOCUS_MARKDOWN')}
        on:input={handleInput}
        on:blur={handleBlur}
      />
    </div>

    <div class="mt-4">
      <h3 class="mb-2">HTML</h3>
      <TextArea value={htmlString} disabled />
    </div>
  </div>

  <hr class="my-6" />

  <div>
    <h2>Meta</h2>
    <div class="grid grid-cols-12 gap-4">
      <fieldset class="col-span-12 grid grid-cols-12">
        <label for="" class="col-span-1 flex items-center">Url</label>
        <input
          type="text"
          class="col-span-11"
          value={$state.context.url}
          on:focus={handleFocus('FOCUS_URL')}
          on:input={handleInput}
          on:blur={handleBlur}
        />
      </fieldset>
      <fieldset class="col-span-12 grid grid-cols-12">
        <label for="" class="col-span-1 flex items-center">Alt</label>
        <input
          type="text"
          class="col-span-11"
          value={$state.context.alt}
          on:focus={handleFocus('FOCUS_ALT')}
          on:input={handleInput}
          on:blur={handleBlur}
        />
      </fieldset>
      <fieldset class="col-span-6 grid grid-cols-12">
        <label for="" class="col-span-2 flex items-center">Width</label>
        <input
          type="number"
          class="col-span-10"
          on:focus={handleFocus('FOCUS_WIDTH')}
          on:input={handleInput}
          on:blur={handleBlur}
        />
      </fieldset>
      <fieldset class="col-span-6 grid grid-cols-12">
        <label for="" class="col-span-2 flex items-center">Height</label>
        <input
          type="number"
          class="col-span-10"
          on:focus={handleFocus('FOCUS_HEIGHT')}
          on:input={handleInput}
          on:blur={handleBlur}
        />
      </fieldset>
    </div>
  </div>
</main>

<style lang="postcss">
  h1 {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
  }

  input {
    @apply py-2 px-4;
    background-color: hsl(210deg 31% 27%);
  }
</style>
