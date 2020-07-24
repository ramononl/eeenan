<template>
  <div class="h-full max-h-full overflow-hidden">
    <div
      v-if="stories.length > 0"
      class="flex flex-col h-full max-h-full p-4 pb-10 bg-gray-300"
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
            <component :is="story.type" :story="story" />
          </div>
        </transition-group>
        <CheckAnswer :display="check" />
      </div>
      <div
        class="flex items-center mt-4 overflow-hidden bg-orange-500 divide-x divide-orange-100 rounded-lg h-14"
      >
        <button
          :disabled="currentStory === 1"
          type="button"
          class="flex items-center justify-center flex-1 h-full p-2 focus:outline-none disabled:bg-gray-400 disabled:cursor-not-allowed"
          @click="prevStory"
        >
          <AppIcon :size="5" icon="ArrowLeft" color="orange-100" />
        </button>
        <button
          :disabled="!isQuestion"
          type="button"
          class="flex items-center justify-center flex-1 h-full p-2 focus:outline-none disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          <AppIcon :size="5" icon="Eye" color="orange-100" />
        </button>
        <button
          v-if="!lastStory"
          :disabled="isQuestion"
          type="button"
          class="flex items-center justify-center flex-1 h-full p-2 focus:outline-none disabled:bg-gray-400 disabled:cursor-not-allowed"
          @click="nextStory"
        >
          <AppIcon :size="5" icon="ArrowRight" color="orange-100" />
        </button>
        <button
          v-else
          :disabled="isQuestion"
          type="button"
          class="flex items-center justify-center flex-1 h-full p-2 focus:outline-none disabled:bg-gray-400 disabled:cursor-not-allowed"
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
import StoryTitle from '~/components/common/StoryTitle'
import CheckAnswer from '~/components/common/CheckAnswer'
import StoryText from '~/components/common/StoryText'
import StoryQuiz from '~/components/common/StoryQuiz'
import StorySort from '~/components/common/StorySort'

export default {
  layout: 'fullscreen',
  components: {
    StoryTitle,
    CheckAnswer,
    StoryText,
    StoryQuiz,
    StorySort
  },
  data() {
    return {
      currentStory: 1,
      transitionName: 'cards-next',
      check: null
    }
  },
  computed: {
    classObject() {
      return {
        'border-gray-400': !this.check,
        'border-green-500': this.check === 'correct',
        'border-red-500': this.check === 'wrong'
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
    isQuestion() {
      if (this.stories.length > 0) {
        const questionTypes = ['StoryQuiz', 'StorySort']
        return questionTypes.includes(this.stories[this.currentStory - 1].type)
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
    }
  }
}
</script>

<style lang="postcss">
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
