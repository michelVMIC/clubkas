<script lang="ts">
  export let url: string;
  export let text: string;
  export let image =
    "https://mic-production-upload-image-share.s3.eu-central-1.amazonaws.com/M.I.C/Collecte+365+V2/Facebook+share.png";
  export let shareURL = `${url}`;
  let shareText = text.includes("https://") ? encodeURI(text) : encodeURIComponent(text + " " + shareURL);
  export let link =
    "https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(shareURL) + "&quote=" + shareText;
</script>

<a href={link} target="_blank">
  <div class="fb-share">
    <slot>
      <img class="h-auto w-10 mr-1 mt-1" src={image} alt="Via Facebook delen" />
    </slot>
  </div>
</a>

<style>
</style>
