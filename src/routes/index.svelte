<script lang="ts">
  import TextArea from '$lib/components/TextArea.svelte';
  import { useMachine } from '$lib/hooks/useMachine';
  import { store, actions, formMachine } from '$lib/store';
  // import { store, actions } from '$lib/';

  import { derived } from 'svelte/store';
  import { log } from 'xstate/lib/actions';

  const { send, state } = useMachine(formMachine, {});

  $: {
    console.log($state.context);
  }

  // let markdownText = '';
  // $: url = getUrl(markdownText);
  // $: alt = getAlt(markdownText);

  // let width = undefined;
  // let height = undefined;

  // $: htmlString = getHtmlString({ width, height, url, alt });

  // derived(store, ($store) => {
  //   console.log($store);
  // });
  // $: {
  //   // console.log(url);
  //   // console.log(alt);
  // }

  // function updateMarkdown() {
  //   const nextUrl = Boolean(url) ? url : '';
  //   const nextAlt = Boolean(alt) ? alt : '';
  //   return `![${nextAlt}](${nextUrl})`;
  // }

  function getUrl(txt: string) {
    if (!txt) {
      return '';
    }

    const REGEX_ULR = /\((.*)\)/;
    const result = txt.match(REGEX_ULR);

    if (result === null) {
      return '';
    }

    const [_, url] = result;

    return url;
  }

  // function getAlt() {
  //   if (!markdownText) {
  //     return '';
  //   }

  //   const REGEX_ALT = /\[(.*)\]/;
  //   const result = markdownText.match(REGEX_ALT);

  //   if (result === null) {
  //     return '';
  //   }

  //   const [_, alt] = result;

  //   return alt;
  // }

  function getHtml(state) {
    return `<img src="${state.context.url}" alt="${state.context.alt}" ${
      state.context.width ? `width="${state.context.width}"` : ''
    } ${state.context.height ? `height="${state.context.height}"` : ''} />`;
  }

  $: htmlString = getHtml($state);
</script>

<main class="container max-w-screen-md mx-auto h-screen">
  <h1>Markdown to HTML Image Parser</h1>

  <div class="flex flex-col justify-between">
    <div>
      <h3 class="mb-2">Markdown</h3>
      <TextArea value={$state.context.markdown} on:input={handleMarkdownChange} />
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
          on:focus={() => send('FOCUS_URL')}
          on:input={(e) => {
            send('INPUT_CHANGE', { value: e.target.value });
          }}
          on:blur={() => send('LOST_FOCUS')}
        />
      </fieldset>
      <fieldset class="col-span-12 grid grid-cols-12">
        <label for="" class="col-span-1 flex items-center">Alt</label>
        <input
          type="text"
          class="col-span-11"
          on:focus={() => send('FOCUS_ALT')}
          on:input={(e) => {
            send('INPUT_CHANGE', { value: e.target.value });
          }}
          on:blur={() => send('LOST_FOCUS')}
        />
      </fieldset>
      <fieldset class="col-span-6 grid grid-cols-12">
        <label for="" class="col-span-2 flex items-center">Width</label>
        <input type="number" bind:value={$store.width} class="col-span-10" />
      </fieldset>
      <fieldset class="col-span-6 grid grid-cols-12">
        <label for="" class="col-span-2 flex items-center">Height</label>
        <input type="number" bind:value={$store.height} class="col-span-10" />
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
