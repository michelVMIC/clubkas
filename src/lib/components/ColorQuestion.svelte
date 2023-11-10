<script lang="ts">
  import ColorPicker from "svelte-awesome-color-picker";
  import ColorPickerInput from "./ColorPickerInput.svelte";

  /** The hex code of the chosen color. Defaults to `#ff5555`. */
  export let hex: string = "#ff5555";

  /** Label of our question*/
  export let label: string;

  /** The name and data field of our question*/
  export let name: string;
</script>

<ColorPicker bind:hex {label} components={{ input: ColorPickerInput }} />
<input type="text" {name} value={hex} hidden />
