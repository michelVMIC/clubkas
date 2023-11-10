<script lang="ts">
  export let url: string;
  export let text: string;
  export let image = "https://mic-production-upload-image-share.s3.eu-central-1.amazonaws.com/M.I.C/x-logo-white.png";

  let shareText = text.includes("https://") ? encodeURIComponent(text) : encodeURIComponent(text + " " + url);

  export let link = `https://twitter.com/intent/tweet?text=` + shareText;
</script>

<a href={link} target="_blank">
  <div class="tw-share">
    <slot>
      <img class="h-auto w-10 mr-1 mt-1" src={image} alt="Via Twitter delen" />
    </slot>
  </div>
</a>
