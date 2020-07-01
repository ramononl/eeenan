<template>
  <div class="flex flex-col h-full max-h-full px-4 pt-4 pb-10 bg-black">
    <div>
      <div
        class="flex items-center justify-between font-semibold text-gray-100"
      >
        <div class="flex-1">
          <nuxt-link to="/">Zurück</nuxt-link>
        </div>
        <div class="flex items-center justify-center flex-1">
          <span>Kategorie</span>
          <AppIcon :size="5" icon="ChevronRight" />
          <span>Titel</span>
        </div>
        <div class="flex-1 text-right">
          {{ currentCard }} / {{ numberOfCards }}
        </div>
      </div>
      <div class="flex mt-6 space-x-2">
        <div
          v-for="i in numberOfCards"
          :key="i"
          :class="[i <= currentCard ? 'bg-gray-100' : 'bg-gray-700']"
          class="flex-1 h-1 rounded-full"
        ></div>
      </div>
    </div>
    <div class="relative flex-1 w-full mt-4">
      <transition name="cards">
        <div
          :key="visibleCards[0]"
          class="absolute inset-0 z-10 w-full p-4 overflow-y-auto origin-top transform bg-gray-100 rounded-lg"
        >
          <p class="text-2xl font-semibold">{{ visibleCards[0] }}</p>
          <p v-for="y in numberOfCards" :key="y">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum
            odit facere doloremque ad ratione fuga assumenda esse. Commodi nulla
            quod asperiores odio accusantium necessitatibus, tenetur incidunt,
            voluptates hic, reiciendis suscipit.
          </p>
        </div>
      </transition>
      <!-- <div
        :class="[currentCard === 2 ? '' : 'opacity-75 -translate-y-4 scale-95']"
        class="absolute inset-0 z-0 w-full p-4 overflow-y-auto transition-all duration-500 ease-in-out delay-150 origin-top transform bg-gray-100 rounded-lg"
      >
        <p class="text-2xl font-semibold">{{ i }}</p>
        <p v-for="y in numberOfCards" :key="y">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum odit
          facere doloremque ad ratione fuga assumenda esse. Commodi nulla quod
          asperiores odio accusantium necessitatibus, tenetur incidunt,
          voluptates hic, reiciendis suscipit.
        </p>
      </div> -->
    </div>
    <div class="flex justify-between mt-6">
      <AppButton @click.native="prevCard">
        <AppIcon :size="5" icon="ArrowLeft" />
      </AppButton>
      <AppButton @click.native="nextCard">
        <AppIcon :size="5" icon="ArrowRight" />
      </AppButton>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'fullscreen',
  data() {
    return {
      numberOfCards: 9,
      currentCard: 1
    }
  },
  computed: {
    visibleCards() {
      const visibleCards = []
      visibleCards.push(this.currentCard)
      if (this.currentCard < this.numberOfCards) {
        visibleCards.push(this.currentCard + 1)
      }
      return visibleCards
    }
  },
  methods: {
    nextCard() {
      if (this.currentCard < this.numberOfCards) {
        this.currentCard++
      }
    },
    prevCard() {
      if (this.currentCard > 1) {
        this.currentCard--
      }
    }
    // computedClasses(key) {
    //   if (key === this.currentCard) {
    //     return 'scale-1 z-10 shadow-md'
    //   } else if (key === this.currentCard + 1) {
    //     return 'scale-95 -translate-y-4 z-0 opacity-75'
    //   } else {
    //     return 'hidden'
    //   }
    // }
  }
}
</script>

<style></style>
