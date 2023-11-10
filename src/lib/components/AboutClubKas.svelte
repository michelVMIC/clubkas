<script lang="ts">
  import { Card } from "flowbite-svelte";
  import ProgressBar from "./ProgressBar.svelte";

  export let message: string | null;
  export let totalRaised: number;
  export let targetAmount: number | null;
  export let primaryColor: string;
</script>

<Card class="max-w-none w-11/12 mx-auto mt-4 flex flex-col gap-3">
  <slot />

  <p class="text-center">{message}</p>

  <ProgressBar value={totalRaised} max={targetAmount ?? 75} --primary-color={primaryColor} />
</Card>
