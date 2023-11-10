<script lang="ts">
  export let label: string;
  export let hex: string;
  /* svelte-ignore unused-export-let */
  export let isOpen: boolean;
  export let labelWrapper: HTMLLabelElement;
  export let name: string;

  /** A custom component for arranging a color picker question. */
</script>

<div class="px-3 py-2 shadow-sm rounded-md">
  <label class="flex items-center" bind:this={labelWrapper}>
    <input
      type="color"
      on:click|preventDefault={() => {
        /* prevent default behavior on most browsers */
      }}
      on:mousedown|preventDefault={() => {
        /* prevent default behavior on safari */
      }}
      {name}
      aria-haspopup="dialog"
      value={hex}
      class="color-picker"
    />
    {label}
  </label>
</div>

<style>
  .color-picker {
    display: inline-flex;
    flex: 0 0 auto;
    padding: 4px;
    border: none;
    width: 48px;
    height: 36px;
    flex-shrink: 0;
    cursor: pointer;
    border-radius: 75%;
    margin: 0 12px;
    background: none;
  }
</style>
