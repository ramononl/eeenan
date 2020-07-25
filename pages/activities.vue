<template>
  <PageContainer :title="title" :padding-x="true">
    <div v-if="finishedStories" class="space-y-6">
      <ContentCard>
        <div>
          <h2>Letzte 7 Tage</h2>
          <p class="text-sm text-gray-700">
            Dein Fortschritt in der letzten Woche (Anzahl angesehene
            Lern-Stories)
          </p>
        </div>
        <div class="h-48 mt-4">
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
      </ContentCard>
      <ContentCard>
        <div class="flex items-center justify-between ">
          <div>
            <h2>Diese Woche</h2>
            <p class="text-sm text-gray-700">
              Angesehene Stories
            </p>
          </div>
          <div>
            <span class="text-5xl font-semibold leading-none text-gray-700">{{
              finishedStoriesWeek.total
            }}</span>
          </div>
        </div>
      </ContentCard>
      <ContentCard>
        <div class="flex items-center justify-between ">
          <div>
            <h2>Total</h2>
            <p class="text-sm text-gray-700">
              Angesehene Stories
            </p>
          </div>
          <div>
            <span class="text-5xl font-semibold leading-none text-gray-700">{{
              numberOfFinishedStories
            }}</span>
          </div>
        </div>
      </ContentCard>
      <ContentCard>
        <div>
          <h2>Aktivität nach Thema</h2>
          <p class="text-sm text-gray-700">
            Folgende Anzahl an Stories hast du dir in den jeweiligen
            Themenbereichen angesehen
          </p>
        </div>
        <div class="pt-2 divide-y">
          <div
            v-for="topic in finishedStoriesSorted"
            :key="topic.id"
            class="flex items-center justify-between py-2 last:pb-0"
          >
            <div class="flex items-center space-x-2">
              <div
                class="flex-none w-6 h-6 rounded-lg"
                :class="`bg-${topic.color}-400`"
              ></div>
              <div>
                <span class="font-semibold leading-tight">{{
                  topic.title
                }}</span>
              </div>
            </div>
            <div>
              <span class="font-semibold text-gray-600">{{
                topic.stories
              }}</span>
            </div>
          </div>
        </div>
      </ContentCard>
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
    numberOfFinishedStories() {
      const numberOfFinishedStories = Object.keys(this.finishedStories).length
      if (numberOfFinishedStories !== 0) {
        return numberOfFinishedStories
      } else {
        return 0
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
        xLabels: weekdays,
        total: weekdayCounter.reduce((a, b) => a + b, 0)
      }
    },
    finishedStoriesSorted() {
      const topics = this.$store.state.topics
      const finishedStories = Object.keys(
        this.$store.state.user.finishedStories
      )
      const finishedStoriesSorted = []
      const storiesStore = JSON.parse(JSON.stringify(this.$store.state.stories))
      if (Object.keys(storiesStore).length > 0) {
        Object.keys(storiesStore).forEach((topic) => {
          Object.keys(storiesStore[topic]).forEach((subtopic) => {
            Object.keys(storiesStore[topic][subtopic]).forEach((lesson) => {
              Object.keys(storiesStore[topic][subtopic][lesson]).forEach(
                function(story) {
                  if (finishedStories.includes(story)) {
                    let topicIndex = finishedStoriesSorted.findIndex(
                      (el) => el.id === topic
                    )
                    if (topicIndex === -1) {
                      topicIndex =
                        finishedStoriesSorted.push({
                          id: topic,
                          title: topics[topic].title,
                          ordering: topics[topic].ordering,
                          color: topics[topic].color,
                          stories: []
                        }) - 1
                    }

                    finishedStoriesSorted[topicIndex].stories.push({
                      id: story
                    })
                  }
                }
              )
            })
          })
        })

        finishedStoriesSorted.sort((a, b) => (a.ordering > b.ordering ? 1 : -1))

        finishedStoriesSorted.forEach((topic, index) => {
          const numberOfFinishedStoriesInTopic =
            finishedStoriesSorted[index].stories.length
          finishedStoriesSorted[index].stories = numberOfFinishedStoriesInTopic
        })

        return finishedStoriesSorted
      } else {
        return false
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
  @apply hidden;
}

.grid line {
  @apply stroke-gray-300;
}
</style>
