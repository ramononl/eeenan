<template>
  <div>
    <div class="flex flex-col h-screen max-h-screen px-4 py-12 bg-red-500">
      <div>
        <div class="flex items-center justify-between">
          <div>Kategorie > Titel</div>
          <div>1 / 9</div>
        </div>
        <div class="flex space-x-2">
          <div
            v-for="i in 9"
            :key="i"
            class="flex-1 h-2 bg-gray-500 rounded-full"
          ></div>
        </div>
      </div>
      <div class="flex-1 w-full overflow-y-auto bg-green-500 rounded-lg">
        <p v-for="i in 15" :key="i">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum odit
          facere doloremque ad ratione fuga assumenda esse. Commodi nulla quod
          asperiores odio accusantium necessitatibus, tenetur incidunt,
          voluptates hic, reiciendis suscipit.
        </p>
      </div>
      <div class="flex">
        <div class="flex-1 text-center">Zurück</div>
        <div class="flex-1 text-center">Weiter</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'fullscreen'
}
</script>

<style></style>
