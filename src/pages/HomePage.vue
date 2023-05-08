<script setup>
import TopicCard from '@/components/TopicCard.vue'
import { reactive } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const topics = await store.dispatch('topics/getAllTopics')

</script>

<template>
  <section class="page">
    <div class="page__wrapper">

      <div class="page__content">

        <header class="page__header">
          <h1 class="title">Recent topics</h1>
        </header>

        <div class="page__content">
          <!-- TODO: create standalone page for all topics / on the index page show only last 10 topics -->
          <!-- <h4 style="margin-bottom: 20px">Recent <router-link to="/polls">polls</router-link>:</h4> -->
          <h4 class="headings-text" style="margin-bottom: 20px">Online voting realtime</h4>

          <div 
            v-if="topics.length"
            v-for="(topic, index) in topics"
            :key='`${topic.id}`'
            class="page__content-block"
          >
            <TopicCard :topic-data="topic" />
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<style lang="scss">

</style>
