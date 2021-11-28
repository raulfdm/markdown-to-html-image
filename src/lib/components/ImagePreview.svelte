<script lang="ts">
  export let html: string;
  let isOpen = false;

  function handleOpen() {
    isOpen = true;
  }

  function handleClose() {
    isOpen = false;
  }
</script>

<button class="p-2 bg-red-500 rounded-md" on:click={handleOpen}>Preview Image</button>

{#if isOpen}
  <div class="modal">
    <div>
      <button class="close-button" on:click={handleClose}>Close</button>
      {@html html}
    </div>
  </div>

  <style>
    body {
      overflow: hidden;
    }

    .modal {
      overflow: auto;
    }
  </style>
{/if}

<style lang="postcss">
  .modal {
    @apply fixed top-0 left-0 right-0 bottom-0 grid place-items-center p-8;

    background: rgba(0, 0, 0, 0.8);
  }

  .close-button {
    @apply bg-white py-1 px-2 rounded mb-2 text-black;
  }
</style>
