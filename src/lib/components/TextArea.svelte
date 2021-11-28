<script lang="ts">
  export let value = '';
  export let ref: HTMLTextAreaElement = null;
</script>

<textarea bind:value on:input on:focus on:blur bind:this={ref} rows={3} {...$$restProps} />

<style lang="postcss">
  textarea {
    background-color: hsl(210deg 31% 27%);
    @apply p-2 text-lg  w-full;
    height: max-content;
  }
</style>
