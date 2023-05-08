<script setup>
import { RouterLink } from 'vue-router'
import { reactive } from 'vue'

const props = defineProps({
  topicData: {
    type: Object,
    default: () => ({
      id: -1,
      name: "topic1",
      description: "something",
      createdAt: "2023-05-08T14:50:58.624Z"
    })
  }
})

const topic = reactive({ ...props.topicData })
</script>

<template>
  <div class="topic-card">
    <div class="topic-card__wrapper">
      <div class="topic-card__header">
        <RouterLink :to="`/topic/${topic.id}`" class="topic-card__title">{{ topic.name }}</RouterLink>
        <time class="topic-card__time">{{ topic.createdAt }}</time>
      </div>
      <div class="topic-card__body">
        <div class="topic-card__desc">
          {{ topic.description }}
        </div>
        <div class="topic-card__results">{{ topic.voteFor || '???' }}+ | {{ topic.voteAgainst || '???' }}-</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.topic-card {

  &__header {
    align-self: flex-start;

    margin-bottom: 5px;
  }

  &__header,
  &__body {
    display: grid;
    grid-template-columns: 1fr 170px;
  }

  &__title {
    flex-grow: 1;

    font-size: 24px;
    font-weight: 400;
    list-style: none;
    font-family: var(--ff-heading);
  }

  &__time {
    display: block;
    align-self: flex-end;

    width: max-content;
    margin-left: auto;

    font-size: 16px;
    opacity: 0.8;
  }

  // &__body {}

  &__results {
    margin-left: auto;
  }
}
</style>