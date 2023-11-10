<script lang="ts">
  import { Card } from "flowbite-svelte";
  import type { PageData } from "./$types";
  import { HeaderBar, AboutClubKas, Footer, DonateForm } from "$lib/components";

  export let data: PageData;
  const banks = data.bankList.map((bank) => {
    return { value: bank.id, name: bank.name };
  });
</script>

<HeaderBar
  logo={data.clubkas.logo}
  goal={data.clubkas.funding_goal}
  --primary-color={data.clubkas.clubkas_styling[0].primary_color}
  --secondary-color={data.clubkas.clubkas_styling[0].secondary_color}
/>

<AboutClubKas
  message={data.clubkas.message}
  totalRaised={data.clubkas.total_raised}
  targetAmount={data.clubkas.target_amount / 100}
  primaryColor={data.clubkas.clubkas_styling[0].primary_color}
/>

<Card class="mx-auto mt-4 flex flex-col gap-3 max-w-none w-11/12">
  <DonateForm
    {banks}
    --primary-color={data.clubkas.clubkas_styling[0].primary_color}
    --secondary-color={data.clubkas.clubkas_styling[0].secondary_color}
  />
</Card>

<Footer />
