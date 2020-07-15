import Vue from 'vue'

import AppButton from '~/components/ui/AppButton.vue'
import AppIcon from '~/components/common/icons/AppIcon.vue'
import PageContainer from '~/components/layout/PageContainer'
import MissingContent from '~/components/common/MissingContent'
import ContentCard from '~/components/ui/ContentCard'

Vue.component('AppButton', AppButton)
Vue.component('AppIcon', AppIcon)
Vue.component('PageContainer', PageContainer)
Vue.component('MissingContent', MissingContent)
Vue.component('ContentCard', ContentCard)

const ComponentContext = require.context(
  '~/components/common/icons/svg',
  true,
  /\.vue$/i,
  'lazy'
)
ComponentContext.keys().forEach((componentFilePath) => {
  const componentName = componentFilePath
    .split('/')
    .pop()
    .split('.')[0]
  Vue.component(componentName, () => ComponentContext(componentFilePath))
})
