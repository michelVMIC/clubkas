<script lang="ts">
    import { Input, Label } from "flowbite-svelte";
    import { Footer } from "$lib/components";
    import { enhance } from "$app/forms";
    import SubmitButton from "$lib/components/SubmitButton.svelte";
    import type { PageServerData } from "../$types";
  
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
    <h2 class="font-bold text-lg my-4 max-w-md">Meld je aan en maak in drie stappen een account</h2>
    <form method="POST" use:enhance enctype="multipart/form-data" class="flex flex-col gap-2 mb-6">
      <p>Vul hieronder je gegevens in:</p>
      <Label for="name">Voornaam*</Label>
      <Input name="name" placeholder="Voornaam" required class="focus:ring-blue-500 focus:border-blue-500" />
      <Label for="last_name">Achternaam*</Label>
      <Input name="last_name" placeholder="Achternaam" required class="focus:ring-blue-500 focus:border-blue-500" />
      <Label for="email">E-mailadres*</Label>
      <Input name="email" placeholder="voorbeeld@mail.com" required class="focus:ring-blue-500 focus:border-blue-500" />
      <Label for="club-name">Clubnaam*</Label>
      <Input name="target-amount" placeholder="Wat is de naam van de club" required class="focus:ring-blue-500 focus:border-blue-500 mb-4" />
      <SubmitButton --primary-color={primaryColor} --secondary-color={secondaryColor}>Aanmelden</SubmitButton>
    </form>
  </div>
  
  <Footer />
  