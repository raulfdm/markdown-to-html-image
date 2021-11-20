<script lang="ts">
  import TextArea from '$lib/components/TextArea.svelte';

  let markdownText = '![random picture](https://picsum.photos/seed/picsum/400/300)';

  let url = getUrl();
  let alt = getAlt();

  let width = undefined;
  let height = undefined;

  let htmlString = getHtmlString();

  function getUrl() {
    const REGEX_ULR = /\((.*)\)/;
    const [_, url] = markdownText.match(REGEX_ULR);

    return url;
  }

  function getAlt() {
    const REGEX_ALT = /\[(.*)\]/;
    const [_, alt] = markdownText.match(REGEX_ALT);

    return alt;
  }

  function getHtmlString() {
    return `<img src="${url}" alt="${alt}" ${width ? `width="${width}"` : ''} ${
      height ? `height="${height}"` : ''
    }/>`;
  }
</script>

<main class="container max-w-screen-md mx-auto h-screen">
  <h1>Markdown to HTML Image Parser</h1>

  <picture class="grid place-items-center"> {@html htmlString} </picture>

  <div class="flex flex-col justify-between">
    <div>
      <h3 class="mb-2">Markdown</h3>
      <TextArea value="{markdownText}"></TextArea>
    </div>

    <div class="mt-4">
      <h3 class="mb-2">HTML</h3>
      <TextArea value="{htmlString}" disabled></TextArea>
    </div>
  </div>

  <hr class="my-6" />

  <div>
    <h2>Meta</h2>
    <div class="grid grid-cols-12 gap-4">
      <fieldset class="col-span-12 grid grid-cols-12">
        <label for="" class="col-span-1 flex items-center">Url</label>
        <input type="text" value="{url}" class="col-span-11" />
      </fieldset>
      <fieldset class="col-span-12 grid grid-cols-12">
        <label for="" class="col-span-1 flex items-center">Alt</label>
        <input type="text" value="{alt}" class="col-span-11" />
      </fieldset>
      <fieldset class="col-span-6 grid grid-cols-12">
        <label for="" class="col-span-2 flex items-center">Width</label>
        <input type="number" value="{width}" class="col-span-10" />
      </fieldset>
      <fieldset class="col-span-6 grid grid-cols-12">
        <label for="" class="col-span-2 flex items-center">Height</label>
        <input type="number" value="{height}" class="col-span-10" />
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
