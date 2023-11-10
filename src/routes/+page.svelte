<script lang="ts">
  import { Button } from "flowbite-svelte";
  import { Footer } from "$lib/components";
</script>

<header>
  <img
    src="https://mic-production-upload-image-share.s3.eu-central-1.amazonaws.com/M.I.C/Demo's/MIC_headerbeeld.jpg"
    alt="Header afbeelding"
    class="mx-auto"
  />
</header>

<div class="content-container flex flex-col justify-center px-4 py-6 rounded-lg shadow-sm mx-2 my-3">
  <h2 class="font-bold text-lg my-4 max-w-md">Welkom bij Clubkas van MIC</h2>
  <p class="mb-4 max-w-md">Met clubkas kan je je eigen style en pagina aanpassen naar jouw wens!</p>
  <p class="mb-4">Hoe het werkt:</p>
  <ul class="ml-4">
    <li class="list-disc">Zorg dat je bekend bent bij Rabobank.</li>
    <li class="list-disc">Vul je gegevens in.</li>
    <li class="list-disc">Maak en style je eigen pagina.</li>
    <li class="list-disc">Je ontvangt een email met een link, hiermee kan je de pagina altijd bewerken.</li>
    <li class="list-disc">Deel de pagina met alle leden van de club en start met inzamelen!</li>
  </ul>

  <h2 class="font-bold text-lg my-4">Al bekend bij Rabobank?</h2>
  <p class="mb-4">Ben je al klant? Klik dan hier om verder te gaan:</p>
  <Button class="w-full max-w-sm mx-auto" href="https://clubkas365.nl/aanmelden">Meld je aan</Button>
</div>

<Footer />
