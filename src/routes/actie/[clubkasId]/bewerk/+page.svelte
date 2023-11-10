<script lang="ts">
  import { Footer, HeaderBar, LogoUploader, ColorQuestion } from "$lib/components";
  import { Button, Input, Label, Textarea } from "flowbite-svelte";
  import type { PageData } from "./$types";
  import { enhance } from "$app/forms";

  export let data: PageData;
</script>

<HeaderBar logo={data.clubKasData.logo} goal={data.clubKasData.funding_goal} />

<div class="content-container flex flex-col justify-center px-4 py-6 rounded-lg shadow-sm mx-2 my-3">
  <h2 class="font-bold text-lg my-4 max-w-md">Bewerk je pagina</h2>
  <form method="POST" use:enhance enctype="multipart/form-data" class="flex flex-col gap-2 mb-6">
    <Label for="funding-goal">Inzamelingsdoel</Label>
    <Input name="funding-goal" placeholder="De Marathon" bind:value={data.clubKasData.funding_goal} required />
    <Label for="target-amount">Streefbedrag</Label>
    <Input type="number" name="target-amount" placeholder="250" bind:value={data.clubKasData.target_amount} />
    <Label>Deze actie starten wij omdat:</Label>
    <Textarea
      name="motivation-message"
      placeholder="Beschrijf hier waarom jij geld inzamelt voor dit doel"
      required
      bind:value={data.clubKasData.message}
    />
    <LogoUploader bind:photoUploadedUrl={data.clubKasData.logo} signedUrl={data.logoUploadUrl} previewable={false} required={false}/>

    <h3 class="font-semibold">Kies je huisstyle kleuren</h3>

    <ColorQuestion
      label="Kies je primaire kleur"
      name="primary-color"
      bind:hex={data.clubKasData.clubkas_styling[0].primary_color}
    />
    <ColorQuestion
      label="Kies je secundaire kleur"
      name="secondary-color"
      bind:hex={data.clubKasData.clubkas_styling[0].secondary_color}
    />
    <Button type="submit" class="w-full max-w-sm mx-auto">Opslaan</Button>
  </form>
</div>

<Footer />
logoUploadUrl
