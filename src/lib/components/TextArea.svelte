<script>
  export let value = '';
</script>

<textarea cols="35" rows="2" bind:value on:input on:focus on:blur {...$$restProps} />

<style lang="postcss">
  textarea {
    background-color: hsl(210deg 31% 27%);
    @apply p-2 text-lg resize-none w-full;
  }
</style>
