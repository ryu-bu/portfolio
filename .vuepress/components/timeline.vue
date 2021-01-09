// .vuepress/components/sample-timeline.vue
<template>
  <timeline timeline-theme="lightblue">
    <timeline-item bg-color="green">1999 Born in Japan</timeline-item>
    <timeline-item bg-color="purple">2013 Moved to the US</timeline-item>
    <timeline-item bg-color="brown">2014-2018 Belmont High School</timeline-item>
    <timeline-title bg-color="red">2018- Computer Engineering, B.S., Boston University</timeline-title>
  </timeline>
</template>
 
<script>
import { Timeline, TimelineItem, TimelineTitle } from 'vue-cute-timeline'
 
export default {
  name: 'sample-timeline',
  components: {
    Timeline,
    TimelineItem,
    TimelineTitle,
  }
}
</script>