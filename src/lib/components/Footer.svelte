<script lang="ts">
  import InfoIcon from "~icons/lucide/info";
  import HelpIcon from "~icons/lucide/help-circle";

  /**
   * This defines the color of the icons, defaults to red.
   */
  export let color = "red";
</script>

<footer class="flex flex-col gap-2 justify-between items-center mt-6 p-4 max-w-2xl mx-auto sm:flex-row bg-neutral-100">
  <div class="flex flex-col gap-2">
    <a class="flex flex-row gap-1" href="https://www.mobileinteractioncompany.com/privacyverklaring"
      ><InfoIcon {color} width="1.5em" height="1.5em" />Privacyverklaring</a
    >
    <a class="flex flex-row gap-1" href="https://www.mobileinteractioncompany.com/crowdfunding/clubkas-365"
      ><HelpIcon {color} width="1.5em" height="1.5em" />Meer over Clubkas</a
    >
  </div>
  <div class="flex gap-3">
    <img
      class="w-24 h-12"
      src="https://www.vkon.nl/wp-content/uploads/2022/12/Rabobank-Logo-300x173.png"
      alt="Rabobank logo"
    />
    <img
      class="w-24 h-12"
      src="https://mic-production-upload-image-share.s3.eu-central-1.amazonaws.com/M.I.C/Powered_by_MIC.png"
      alt="MIC logo"
    />
  </div>
</footer>
