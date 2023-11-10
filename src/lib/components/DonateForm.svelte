<script lang="ts">
  import { enhance } from "$app/forms";
  import { Button, Input, Label, Select, type SelectOptionType } from "flowbite-svelte";
  import SubmitButton from "$lib/components/SubmitButton.svelte";

  export let banks: SelectOptionType[];

  let selectedIdx = 1;
  /** Define the variables that will hold the amount in euros, which we will send to Rabobank in the payment */
  let selectedAmount = "20";
  $: parsedSelectedAmount = parseFloat(selectedAmount) * 100;
  let customAmountValue: string;

  const buttonClickHandler = (amount: string, idx: number) => {
    selectedIdx = idx;
    selectedAmount = amount;
    customAmountValue = "";
  };

  const inputHandler = (ev: Event) => {
    const input = ev?.target as HTMLInputElement;
    selectedIdx = 3;
    selectedAmount = input.value;
  };
</script>

<form method="POST" use:enhance class="flex flex-col gap-4">
  <div class="question-container">
    <Label class="mb-2">Selecteer je bedrag</Label>
    <div class="flex gap-1.5 flex-row">
      <button
        id="test"
        on:click|preventDefault={(_ev) => buttonClickHandler("10", 0)}
        class="p-3 rounded-md {selectedIdx === 0 ? 'payment-button selected' : 'payment-button'}">10</button
      >
      <button
        on:click|preventDefault={(_ev) => buttonClickHandler("20", 1)}
        class="p-3 rounded-md {selectedIdx === 1 ? 'payment-button selected' : 'payment-button'}">20</button
      >
      <button
        on:click|preventDefault={(_ev) => buttonClickHandler("30", 2)}
        class="p-3 rounded-md {selectedIdx === 2 ? 'payment-button selected' : 'payment-button'}">30</button
      >
      <Input
        class="w-full max-w-[9rem]"
        on:change={(ev) => inputHandler(ev)}
        type="number"
        placeholder="Anders"
        min="1"
        bind:value={customAmountValue}
      />

      <input name="selected-amount" type="number" bind:value={parsedSelectedAmount} hidden />
    </div>
  </div>
  <div class="question-container">
    <Label for="bank" class="mb-2">Selecteer je bank</Label>
    <Select id="bank" name="bank" items={banks} />
  </div>

  <SubmitButton>Doneer</SubmitButton>
</form>

<style>
  .payment-button.selected {
    background-color: var(--primary-color);
    color: var(--secondary-color);
  }

  .payment-button {
    background-color: theme('colors.neutral.200');
  }
</style>
