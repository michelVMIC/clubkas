<script lang="ts">
  import { CopyUrlShare, FacebookShare, LinkedinShare, TwitterShare, WhatsappShare } from "./socials";

  import MoreIcon from "~icons/lucide/more-horizontal";
  import CloseIcon from "~icons/lucide/x";
  export let isToggled = false;

  export let url: string;
  export let text: string;
  export let title: string;
</script>

<div class="social-slide bg-white" class:slided={isToggled}>
  <div class="flex flex-col align-center">
    <div class="flex mb-3">
      <WhatsappShare {text} {url} />
      <div
        class="share-toggle"
        id="share-toggler"
        tabindex="0"
        role="button"
        on:click={(_ev) => (isToggled = !isToggled)}
        on:keypress={(_ev) => (isToggled = !isToggled)}
      >
        <div>
          {#if !isToggled}
          <MoreIcon />
          {:else}
          <CloseIcon />
          {/if}
        </div>
      </div>
    </div>
  </div>
  <div class="flex w-fit" id="extra-share">
    <FacebookShare {url} {text} />
    <LinkedinShare {url} {title} />
    <TwitterShare {url} {text} />
    <CopyUrlShare {url} />
  </div>
</div>

<style>
  .social-slide {
    width: 100%;
    max-width: fit-content;
    max-height: 4rem;
    overflow: hidden;
    transition: max-height 1s ease-out;
    margin: 0 auto;
  }

  .slided {
    max-height: 9rem;
  }

  .share-toggle {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 2.5rem;
    height: 2.5rem;
    max-height: 2.5rem;
    background-color: #dadada;
    border-radius: 50%;
    margin: auto 0 auto 0.625rem;
  }

  #extra-share {
    margin: 0 auto;
  }
</style>
