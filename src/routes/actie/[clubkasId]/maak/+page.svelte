<script lang="ts">
  import { Button, Input, Label, Textarea } from "flowbite-svelte";
  import { ColorQuestion, Footer, LogoUploader } from "$lib/components";
  import type { PageServerData } from "./$types";
  import { enhance } from "$app/forms";
  import SubmitButton from "$lib/components/SubmitButton.svelte";

  export let data: PageServerData;
  export let primaryColor = "#ff5555";
  export let secondaryColor = "#ffffff"
</script>

<header>
  <img
    src="https://mic-production-upload-image-share.s3.eu-central-1.amazonaws.com/M.I.C/Demo's/MIC_headerbeeld.jpg"
    alt="Header afbeelding"
  />
</header>

<div class="content-container flex flex-col justify-center px-4 py-6 rounded-lg shadow-sm mx-2 my-3">
  <h2 class="font-bold text-lg my-4 max-w-md">Maak je eigen pagina</h2>
  <form method="POST" use:enhance enctype="multipart/form-data" class="flex flex-col gap-2 mb-6">
    <p>Vul hier je gegevens in:</p>
    <Label for="clubkas-slug">Actie naam</Label>
    <Input name="clubkas-slug" placeholder="Actie X" required class="focus:ring-blue-500 focus:border-blue-500" />
    <Label for="funding-goal">Inzamelingsdoel</Label>
    <Input name="funding-goal" placeholder="De Marathon" required class="focus:ring-blue-500 focus:border-blue-500" />
    <Label for="target-amount">Streefbedrag</Label>
    <Input type="number" name="target-amount" placeholder="250" class="focus:ring-blue-500 focus:border-blue-500" />
    <Label>Deze actie starten wij omdat:</Label>
    <Textarea name="motivation-message" placeholder="Beschrijf hier waarom jij geld inzamelt voor dit doel" required unWrappedClass="focus:ring-blue-500 focus:border-blue-500 text-sm p-2.5" />
    <LogoUploader signedUrl={data.logoUploadUrl} />

    <h3 class="font-semibold">Kies je huisstyle kleuren</h3>

    <ColorQuestion label="Kies je primaire kleur" name="primary-color" bind:hex={primaryColor} />
    <ColorQuestion label="Kies je secundaire kleur" name="secondary-color" bind:hex={secondaryColor} />
    <SubmitButton --primary-color={primaryColor} --secondary-color={secondaryColor}>Volgende</SubmitButton>
  </form>
</div>

<Footer />
