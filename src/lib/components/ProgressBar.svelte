<script lang="ts">
  export let value: number;
  export let max: number;

  const parsedValue = (value / 100).toLocaleString("nl-NL", { maximumFractionDigits: 2, maximumSignificantDigits: 2 });

  const parsedMax = (max / 100).toLocaleString("nl-NL", { maximumFractionDigits: 2, maximumSignificantDigits: 2 });
</script>

<div class="progress-section mx-auto w-3/4">
  <progress {value} {max} class="rounded-full min-w-full" />
  <p class="text-center">Wij hebben {parsedValue} van de {parsedMax} opgehaald</p>
</div>

<style>
  progress::-moz-progress-bar {
    background: var(--primary-color);
  }
  progress::-webkit-progress-value {
    background: var(--primary-color);
  }
  progress {
    color: var(--primary-color);
  }
</style>
