<script lang="ts">
  export let logo: string | null;
  export let goal: string | null;
</script>

<header class="">
  <div class="p-5">
    <img src={logo} alt="Logo vereniging" class="w-20" />
  </div>

  <div class="header-text p-16">
    <h1 class="text-2xl text-center font-semibold">{goal}</h1>
  </div>
</header>

<style>
  .header-text {
    background-color: var(--primary-color);
    color: var(--secondary-color);
  }
</style>
