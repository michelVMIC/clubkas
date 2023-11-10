<script lang="ts">
  export let url: string;
  export let text: string;
  export let image =
    "https://mic-production-upload-image-share.s3.eu-central-1.amazonaws.com/KWF/Nederland+geeft+licht/Middel+1%404x.png";
  export let watext = "Collecteer via Whatsapp";
  export let utm = "";

  const shareURL = `${url}${utm}`;
  const shareText = text.includes("https://") ? encodeURIComponent(text) : encodeURIComponent(text + " " + shareURL);
  const surl = "https://api.whatsapp.com/send/?text=" + shareText;
</script>

<a href={surl} class="whatsapp-share" target="_blank">
  <div class="whatsapp-btn flex py-4 btn btn-lg h-2xl bg-[#4caf50] border-0 hover:bg-green-600 hover:text-white px-4">
    <img class="wa-img w-6 mr-2 center" src={image} alt="Via Whatsapp delen" />
    <span class="mx-auto text-white text-sm sm:text-base normal-case">{watext}</span>
  </div>
</a>

<style>
  .whatsapp-btn {
    border-radius: 40px !important;
  }

  @media only screen and (max-width: 355px) {
    .wa-img {
      display: none;
    }
  }
</style>
