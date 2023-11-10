<script lang="ts">
  import { Footer, HeaderBar, SocialSlide } from "$lib/components";
  import { Card, Toast } from "flowbite-svelte";
  import type { PageData } from "./$types";
  import AboutClubKas from "$lib/components/AboutClubKas.svelte";
  import SettingsIcon from "~icons/lucide/settings";
  import { page } from "$app/stores";

  export let data: PageData;
  const url = $page.url;
  let status = url.searchParams.get("status");
</script>

{#if status === "created"}
  <div class="p-5 flex justify-center">
    <Toast>
      <div class="flex gap-2.5">
        <div class="flex">
          <p class="text-4xl self-center">🎉</p>
        </div>
        <div class="">
          <p>Je clubkas pagina is aangemaakt!<br><br>Klik op <a href="./{data.id}/bewerk" class="hover:underline text-black">wijzig</a> als je iets wil veranderen</p>
        </div>  
      </div>
    </Toast>
  </div>
{/if}

<HeaderBar
  logo={data.clubKasData.logo}
  goal={data.clubKasData.funding_goal}
  --primary-color={data.clubKasData.clubkas_styling[0].primary_color}
  --secondary-color={data.clubKasData.clubkas_styling[0].secondary_color}
/>

<AboutClubKas
  message=""
  totalRaised={data.clubKasData.total_raised}
  targetAmount={data.clubKasData.target_amount}
  primaryColor={data.clubKasData.clubkas_styling[0].primary_color}
>
  <a
    class="text-sm ml-auto mr-0 bg-neutral-200 px-3 pt-1.5 pb-2 flex gap-1.5 items-end rounded-md"
    href="./{data.id}/bewerk"
  >
    <span>Wijzig</span>
    <SettingsIcon width="16" height="16" />
  </a>
</AboutClubKas>

<Card class="max-w-none mx-auto mt-4 flex flex-col gap-3 w-11/12">
  <h1 class="text-black text-xl font-bold text-center">Leden uitnodigen</h1>
  <SocialSlide url="https://google.nl" text="hallo" title="test" />
</Card>

<Card class="max-w-none mx-auto mt-4 flex flex-col gap-3 w-11/12">
  <h1 class="text-black text-xl font-bold text-center">Zelf geld inzamelen</h1>
  <SocialSlide url="https://google.nl" text="hallo" title="test" />
</Card>
<Footer />
