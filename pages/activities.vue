<template>
  <PageContainer :title="title">
    <div v-if="finishedStories" class="px-4 space-y-6">
      <div class="p-4 space-y-4 bg-white rounded-md shadow-md">
        <div>
          <h2>Letzte 7 Tage</h2>
          <p class="text-sm text-gray-700">
            Dein Fortschritt in der letzten Woche (Anzahl angesehene
            Lern-Stories)
          </p>
        </div>
        <div class="h-48">
          <TrendChart
            :datasets="[
              {
                data: finishedStoriesWeek.data,
                smooth: true,
                fill: true
              }
            ]"
            :grid="{
              verticalLines: false,
              horizontalLines: true,
              horizontalLinesNumber: 5
            }"
            :labels="{
              xLabels: finishedStoriesWeek.xLabels,
              yLabels: 2,
              yLabelsTextFormatter: (val) => Math.round(val)
            }"
          >
          </TrendChart>
        </div>
      </div>
      <div class="p-4 space-y-4 bg-white rounded-md shadow-md">
        <h2>Total angesehene Stories</h2>
        <p>{{ finishedStories }}</p>
      </div>
    </div>
    <MissingContent v-else />
    <svg
      style="width:0; height:0; position:absolute;"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="btcFill" x1="1" x2="1" y1="0" y2="1">
          <stop offset="0%" stop-color="#fbd38d"></stop>
          <stop offset="100%" stop-color="#DD6B20"></stop>
        </linearGradient>
      </defs>
    </svg>
  </PageContainer>
</template>

<script>
export default {
  data() {
    return {
      title: 'Aktivitäten'
    }
  },
  computed: {
    finishedStories() {
      const finishedStories = this.$store.state.user.finishedStories
      if (Object.keys(finishedStories).length !== 0) {
        return finishedStories
      } else {
        return false
      }
    },
    finishedStoriesWeek() {
      const startDate = this.$dateFns.subDays(
        new Date().setHours(0, 0, 0, 0),
        6
      )
      const endDate = this.$dateFns.toDate(new Date().setHours(23, 59, 59, 999))
      const weekdays = this.$dateFns.eachDayOfInterval({
        start: startDate,
        end: endDate
      })

      const timestamps = []
      Object.keys(this.finishedStories).forEach((story) => {
        const timestamp = this.$dateFns.toDate(
          this.finishedStories[story].timestamp.seconds * 1000
        )
        if (
          this.$dateFns.isWithinInterval(timestamp, {
            start: startDate,
            end: endDate
          })
        ) {
          timestamps.push(timestamp)
        }
      })

      const weekdayCounter = []

      for (let i = 0; i < weekdays.length; i++) {
        let currentDay = 0
        timestamps.forEach((timestamp) => {
          if (this.$dateFns.isSameDay(timestamp, weekdays[i])) {
            currentDay++
          }
        })
        weekdayCounter.push(currentDay)
      }

      weekdays.forEach((weekday, index) => {
        weekdays[index] = this.$dateFns.format(weekday, 'cccccc')
      })

      return {
        data: weekdayCounter,
        xLabels: weekdays
      }
    }
  }
}
</script>

<style lang="postcss">
.curve .fill {
  fill: url(#btcFill);
  fill-opacity: 0.5;
}
.curve .stroke {
  @apply stroke-orange-500 stroke-2;
}

.labels .label text {
  @apply text-gray-600 fill-current text-xs uppercase;
}

.labels .label line {
  display: none;
}
</style>
