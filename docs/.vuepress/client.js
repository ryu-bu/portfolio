import { defineClientConfig } from 'vuepress/client'
import PortfolioTimeline from './components/PortfolioTimeline.vue'

export default defineClientConfig({
  enhance({ app }) {
    app.component('PortfolioTimeline', PortfolioTimeline)
  },
})
