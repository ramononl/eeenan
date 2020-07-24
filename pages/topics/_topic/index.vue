<template>
  <PageContainer
    :title="title"
    :back-button="{ backText: 'Themen', backLink: '/topics' }"
    class="z-10"
  >
    <div
      v-if="subtopics"
      class="border-t border-b border-gray-300 divide-y divide-gray-300"
    >
      <div class="bg-gray-500">
        <div
          class="h-48 -mt-16 bg-right bg-no-repeat bg-cover opacity-75"
          :style="backgroundImage"
        ></div>
      </div>
      <ListItem
        v-for="subtopic in subtopics"
        :key="subtopic.id"
        :link="`/topics/${$route.params.topic}/${subtopic.id}`"
        ><ListItemTopic
          :finished="subtopicFinished(subtopic.id, $route.params.topic)"
          >{{ subtopic.title }}</ListItemTopic
        ></ListItem
      >
    </div>
    <MissingContent v-else />
  </PageContainer>
</template>

<script>
import subtopicFinished from '~/mixins/subtopicFinished'
import ListItem from '~/components/common/ListItem'
import ListItemTopic from '~/components/common/ListItemTopic'

export default {
  components: {
    ListItem,
    ListItemTopic
  },
  mixins: [subtopicFinished],
  computed: {
    title() {
      const topicsStore = this.$store.state.topics
      const topic = this.$getNested(topicsStore, this.$route.params.topic)

      if (topic) {
        return topic.title
      } else {
        return '...'
      }
    },
    subtopics() {
      const subtopicsStore = this.$store.state.subtopics
      const subtopics = this.$getNested(
        subtopicsStore,
        this.$route.params.topic
      )

      if (subtopics) {
        const subtopicsArray = Object.keys(subtopics).map((key) => {
          return { id: key, ...subtopics[key] }
        })
        subtopicsArray.sort((a, b) => (a.ordering > b.ordering ? 1 : -1))
        return subtopicsArray
      } else {
        return false
      }
    },
    backgroundImage() {
      const path = require(`~/assets/images/topics/${this.$route.params.topic}.png`)
      return {
        backgroundImage: `url(${path})`
      }
    }
  },
  transition(to, from) {
    if (to) {
      if (to.name === 'topics') {
        return {
          name: 'slide-right',
          mode: 'in-out'
        }
      } else if (to.name === 'topics-topic-subtopic') {
        return {
          name: 'slide-left',
          mode: 'in-out'
        }
      }
    }
  }
}
</script>

<style></style>
