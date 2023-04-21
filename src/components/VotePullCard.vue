<script setup>
import { RouterLink } from 'vue-router'

const props = defineProps({
  poll: {
    type: Object,
    // required: true,
    default: () => ({ 
      title: 'Pull about average positives',
      timestamp: '25 march 14:03',
      body: 'ts indcredible experience to be here today',
      positiveCount: 20,
      negativeCount: 10,
      voteCount: 30,
      link: '/'
    })
  }
})
</script>

<template>
  <div class="vote-pull-card">
    <div class="vote-pull-card__wrapper">
      <div class="vote-pull-card__header">
        <RouterLink :to="props.poll.link" class="vote-pull-card__title">{{ props.poll.title }}</RouterLink>
        <time class="vote-pull-card__time">{{ props.poll.timestamp }}</time>
      </div>
      <div class="vote-pull-card__body">
        <div class="vote-pull-card__desc">
          {{ props.poll.body }}
        </div>
        <div class="vote-pull-card__results">{{ props.poll.positiveCount }}+ | {{ props.poll.negativeCount }}-</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.vote-pull-card {
  
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

  &__body {

  }

  &__results {
    margin-left: auto;
  }
}
</style>