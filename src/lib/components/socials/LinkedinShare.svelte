<script lang="ts">
  export let url: string;
  export let title: string;
  export let image =
    "https://mic-production-upload-image-share.s3.eu-central-1.amazonaws.com/M.I.C/Collecte+365+V2/LinkedIn+share.png";

  let shareTitle = encodeURIComponent(title);
  let link =
    "https://www.linkedin.com/shareArticle?mini=true&url=" +
    encodeURIComponent(url) +
    "&title=" +
    encodeURIComponent(shareTitle);
</script>

<a href={link} target="_blank">
  <div class="li-share">
    <slot>
      <img class="h-auto w-10 mr-1 mt-1" src={image} alt="Via LinkedIn delen" />
    </slot>
  </div>
</a>

<style>
</style>
