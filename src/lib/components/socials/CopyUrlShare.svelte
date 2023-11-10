<script lang="ts">
  export let url: string;
  export let clicked = false;
  export let image =
    "https://mic-production-upload-image-share.s3.eu-central-1.amazonaws.com/M.I.C/Collecte+365+V2/Link+share.png";

  function copy() {
    const link = url;
    navigator.clipboard.writeText(link);
    clicked = true;
    setTimeout(() => {
      clicked = false;
    }, 2500);
  }
</script>

<div data-tip="Deellink gekopieerd" class="opacity-100">
  <div
    class="copyurl-share cursor-pointer"
    tabindex="0"
    role="button"
    on:click={() => copy()}
    on:keypress={() => copy()}
  >
    <img class="h-auto w-10 mr-1 mt-1" src={image} alt="Kopieer je deellink" />
  </div>
</div>
