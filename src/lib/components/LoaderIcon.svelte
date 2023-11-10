<div class="loader mx-auto relative animate-spin-slow w-[120px] h-[120px] flex flex-row justify-between items-center">
  <div class="loader-icon w-10 h-10 bg-red-500 rounded-full" />
  <div class="loader-icon w-10 h-10 bg-red-500 rounded-full" />
</div>

<style>
  .loader {
    animation: spin-slow 2s linear infinite;
  }

  .loader-icon {
    background-color: var(--primary-color);
  }

  @keyframes spin-slow {
    from {
      transform: rotate(0deg);
    }

    to {
      transform: rotate(360deg);
    }
  }
</style>
