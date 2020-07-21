<template>
  <div class="h-full max-h-full overflow-hidden">
    <div
      v-if="stories.length > 0"
      class="flex flex-col h-full max-h-full px-4 pt-4 pb-10 bg-gray-300"
    >
      <StoryTitle
        :total="stories.length"
        :current="currentStory"
        :current-id="currentStoryId"
        :title="lessonTitle"
        :bookmarked="bookmarked"
      />
      <div class="relative flex-1 w-full mt-4">
        <transition-group :name="transitionName">
          <div
            v-for="story in stories"
            v-show="story.ordering === currentStory"
            :key="story.ordering"
            class="absolute inset-0 w-full py-6 overflow-y-auto transform bg-gray-100 border-2 rounded-lg"
            :class="classObject"
          >
            <!-- <p>{{ story }}</p> -->
            <div v-if="story.type === 'text'">
              <div class="px-4">
                <p>
                  No matter how complex or simple, most websites are written in
                  HTML.
                </p>
                <p>Let's have a look behind the scenes of this website.</p>
              </div>
              <pre
                v-highlightjs
              ><code class="html">&lt;html&gt;&lt;body&gt;Welcome, friend!&lt;/body&gt;&lt;/html&gt;</code></pre>
            </div>
            <div v-if="story.type === 'quiz'" class="px-4">
              <p>Can you remember another tag?</p>
              <div class="mt-4 space-y-2">
                <button
                  v-for="i in 4"
                  :key="i"
                  type="button"
                  class="px-4 py-3 bg-white border rounded-lg shadow-sm focus:outline-none"
                  :class="[
                    selectedAnswer === i ? 'border-gray-700 bg-gray-300' : ''
                  ]"
                  @click="selectAnswer(i)"
                >
                  <span>Das ist die {{ i }}. Antwortmöglichkeit</span>
                </button>
              </div>
            </div>
            <div v-if="story.type === 'sort'" class="px-4">
              <p>Sort this</p>
              <div class="mt-4 overflow-hidden rounded-lg shadow-sm">
                <draggable>
                  <div
                    v-for="i in 4"
                    :key="i"
                    class="overflow-hidden text-sm bg-gray-800 border-b border-gray-700 last:border-b-0"
                  >
                    <div class="flex items-center justify-between">
                      <div>
                        <pre
                          v-highlightjs
                        ><code class="html">&lt;html&gt; {{i}}</code></pre>
                      </div>
                      <div class="px-2">
                        <AppIcon :size="8" icon="MenuAlt" color="gray-600" />
                      </div>
                    </div>
                  </div>
                </draggable>
              </div>
            </div>
          </div>
        </transition-group>
        <div
          class="absolute bottom-0 flex items-center justify-center w-full mb-px transform translate-y-1/2"
        >
          <div
            class="flex items-center py-1 pl-2 pr-3 space-x-2 bg-green-500 rounded-full"
          >
            <div
              class="flex items-center justify-center w-4 h-4 bg-green-100 rounded-full"
            >
              <AppIcon :size="3" icon="Check" color="green-500" />
            </div>
            <span
              class="text-xs font-semibold leading-none tracking-wide text-green-100 uppercase"
              >Korrekt</span
            >
          </div>
          <div
            class="flex items-center py-1 pl-2 pr-3 space-x-2 bg-red-500 rounded-full"
          >
            <div
              class="flex items-center justify-center w-4 h-4 bg-red-100 rounded-full"
            >
              <AppIcon :size="3" icon="X" color="red-500" />
            </div>
            <span
              class="text-xs font-semibold leading-none tracking-wide text-red-100 uppercase"
              >Falsch</span
            >
          </div>
        </div>
      </div>
      <div
        class="flex items-center mt-4 overflow-hidden bg-orange-500 divide-x divide-orange-100 rounded-lg h-14"
      >
        <button
          v-if="currentStory !== 1"
          class="flex items-center justify-center flex-1 h-full p-2 focus:outline-none"
          @click="prevStory"
        >
          <AppIcon :size="5" icon="ArrowLeft" color="orange-100" />
        </button>
        <button
          v-if="!lastStory"
          class="flex items-center justify-center flex-1 h-full p-2 focus:outline-none"
          @click="nextStory"
        >
          <AppIcon :size="5" icon="ArrowRight" color="orange-100" />
        </button>
        <button
          v-else
          class="flex items-center justify-center flex-1 h-full p-2 focus:outline-none"
          @click="finishLesson"
        >
          <span class="font-medium leading-none text-orange-100"
            >Lektion abschliessen</span
          >
        </button>
      </div>
    </div>
    <div v-else class="h-full pt-12 bg-gray-300">
      <MissingContent />
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import StoryTitle from '~/components/common/StoryTitle'

export default {
  layout: 'fullscreen',
  components: { StoryTitle, draggable },
  data() {
    return {
      currentStory: 1,
      transitionName: 'cards-next',
      isCorrect: false,
      isWrong: false,
      selectedAnswer: null
    }
  },
  computed: {
    classObject() {
      return {
        'border-gray-400': !this.isCorrect && !this.isWrong,
        'border-green-500': this.isCorrect,
        'border-red-500': this.isWrong
      }
    },
    lastStory() {
      return this.currentStory >= this.stories.length
    },
    lessonTitle() {
      const lessonsStore = this.$store.state.lessons
      const lesson = this.$getNested(
        lessonsStore,
        this.$route.params.topic,
        this.$route.params.subtopic,
        this.$route.params.lesson
      )
      if (lesson) {
        return lesson.title
      } else {
        return '...'
      }
    },
    stories() {
      const storiesStore = this.$store.state.stories
      const stories = this.$getNested(
        storiesStore,
        this.$route.params.topic,
        this.$route.params.subtopic,
        this.$route.params.lesson
      )

      if (stories) {
        const storiesArray = Object.keys(stories).map((key) => {
          return { id: key, ...stories[key] }
        })
        storiesArray.sort((a, b) => (a.ordering > b.ordering ? 1 : -1))
        return storiesArray
      } else {
        return []
      }
    },
    currentStoryId() {
      if (this.stories.length > 0) {
        return this.stories[this.currentStory - 1].id
      } else {
        return false
      }
    },
    bookmarked() {
      if (this.$store.state.user.bookmarks.includes(this.currentStoryId)) {
        return true
      } else {
        return false
      }
    }
  },
  watch: {
    stories() {
      this.checkQuery()
    }
  },
  mounted() {
    this.checkQuery()
  },
  methods: {
    checkQuery() {
      if (
        this.stories.length > 0 &&
        Object.hasOwnProperty.call(this.$route.query, 'start')
      ) {
        const query = this.$route.query.start
        const index = this.stories.findIndex((element) => element.id === query)
        if (index !== -1) {
          this.currentStory = index + 1
        }
      }
    },
    dateInSeconds() {
      return Math.floor(Date.now() / 1000)
    },
    nextStory() {
      if (this.currentStory < this.stories.length) {
        this.dispatchFinishedStory()
        this.transitionName = 'cards-next'
        this.currentStory++
      }
    },
    prevStory() {
      if (this.currentStory > 1) {
        this.transitionName = 'cards-prev'
        this.currentStory--
      }
    },
    finishLesson() {
      this.dispatchFinishedStory()
      this.$router.go(-1)
    },
    dispatchFinishedStory() {
      this.$store.dispatch('user/addFinishedStory', {
        key: this.currentStoryId,
        payload: {
          timestamp: {
            seconds: this.dateInSeconds()
          }
        }
      })
    },
    selectAnswer(i) {
      this.selectedAnswer = i
    }
  }
}
</script>

<style lang="postcss" scoped>
.cards-next-enter-active,
.cards-next-leave-active,
.cards-prev-enter-active,
.cards-prev-leave-active {
  @apply transition-all duration-500 ease-in-out;
}

.cards-next-enter {
  @apply translate-x-full opacity-0;
}

.cards-next-leave-to {
  @apply -translate-x-full opacity-0;
}

.cards-next-enter-to,
.cards-next-leave {
  @apply translate-x-0 opacity-100;
}

.cards-prev-enter {
  @apply -translate-x-full opacity-0;
}

.cards-prev-leave-to {
  @apply translate-x-full opacity-0;
}

.cards-prev-enter-to,
.cards-prev-leave {
  @apply translate-x-0 opacity-100;
}
</style>
