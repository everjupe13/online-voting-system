<script setup>
import { BreadCrumbs } from '@/shared/BreadCrumbs'
import AppButton from '../components/AppButton.vue'
import { useTopicInfo } from '@/modules/topics/useTopicInfo'
import { useRoute } from 'vue-router'
import { watchEffect, ref } from 'vue'
import { useStore } from 'vuex'
import { timestamp } from '@vueuse/core'

const route = useRoute()
const store = useStore()


const { topic, refetch } = await useTopicInfo({ id: route.params.id })

const handleAgreeClick = async () => {
  if (!topic.value.is_user_voted) {
    store.dispatch('topics/updateUserVote', {
      topicId: route.params.id,
      voteResult: true
    })

    await refetch()
  }
}
const handleDisagreeClick = async () => {
  if (!topic.value.is_user_voted) {
    store.dispatch('topics/updateUserVote', {
      topicId: route.params.id,
      voteResult: false
    })

    await refetch()
  }
}

const voteProgressFor = ref(0)
const voteProgressAgainst = ref(0)
console.log({ ...topic.value })

watchEffect(() => {
  const totalVotes = topic.value.votes_for + topic.value.votes_against
  const countFor = (topic.value.votes_for / totalVotes) * 100
  const countAgainst = (topic.value.votes_against / totalVotes) * 100

  const countForFraction = countFor >= 10
    ? countFor <= 90
      ? countFor
      : 90
    : 10

  const countAgaintFraction = countAgainst >= 10
    ? countAgainst < 90
      ? countAgainst
      : 90
    : 10

  voteProgressFor.value = countForFraction
  voteProgressAgainst.value = countAgaintFraction
})

const breadcrumbs = [{ link: '/', name: 'Home' }, { name: topic.value.name }]
</script>

<template>
  <section class="page">
    <div class="page__wrapper">
      <div class="page__content">
        <header class="page__header">
          <BreadCrumbs :crumbs="breadcrumbs" class="page__header-breadcrumbs" />
          <h1 class="title">{{ topic.name }}</h1>
        </header>

        <div class="page__content">

          <div class="page__content-block">
            <div class="votes-progress">
              <div class="votes-progress-track">
                <span :style="{ width: `${voteProgressFor}%` }" class="votes-progress-track__for"></span>
                <span :style="{ width: `${voteProgressAgainst}%` }" class="votes-progress-track__against"></span>
              </div>
              <div :class="['votes-progress-controls', { '--voted': topic.is_user_voted }]">
                <AppButton class="votes-progress-controls__btn votes-progress-controls__for"
                  @click.stop="handleAgreeClick">Agree</AppButton>
                <AppButton class="votes-progress-controls__btn votes-progress-controls__against"
                  @click.stop="handleDisagreeClick">Disagree</AppButton>
              </div>
            </div>
          </div>

          <div class="page__content-block">
            <div class="topic__info">
              <div class="common-text">Total votes <span class="text-animated_positive">for</span>: {{ topic.votes_for }}</div>
              <div class="common-text">Total votes <span class="text-animated_negative">against</span>: {{
                topic.votes_against }}</div>
              <p class="common-text topic__description">{{ topic.description }}</p>
            </div>
          </div>
        </div>
      </div>  
      <time class="common-text topic__timestamp">{{ topic.createdAt }}</time>    
    </div>
  </section>
</template>

<style lang="scss" scoped>
.votes-progress-track {
  display: flex;
  justify-content: space-between;

  margin-bottom: 20px;
  height: 10px;
  border-radius: 4px;

  background: var(--color-background);
  overflow: hidden;

  &__for {
    display: block;
    width: 75%;
    background: var(--link-gradient-2);
    transition: width .5s .2s ease-in-out;
  }

  &__against {
    display: block;
    width: 25%;
    background: var(--link-gradient);
    transition: width .5s .2s ease-in-out;
  }
}

.votes-progress-controls {
  display: flex;
  justify-content: space-between;

  &.--voted {
    .votes-progress-controls {
      &__btn {
        filter: grayscale(.5);
      }
    }
  }

  &__btn {
    min-width: 120px;
  }

  &__for {
    background: var(--link-gradient-2);
  }

  &__against {
    background: var(--link-gradient);
  }
}

.text-animated {
  &_positive {
    font-weight: 600;
    font-family: var(--ff-menlo);
    font-weight: 400;
    color: inherit;

    animation: colorized-positive 6s linear infinite;
  }

  &_negative {
    font-weight: 600;
    font-family: var(--ff-menlo);
    font-weight: 400;
    color: inherit;

    animation: colorized-negative 6s linear infinite;
  }

  @keyframes colorized-positive {
    0% {
      color: var(--color-text);
    }

    10% {
      color: #4f92f7;
    }

    60% {
      color: #4f92f7;
    }

    70% {
      color: var(--color-text);
    }

    100% {
      color: var(--color-text);
    }
  }

  @keyframes colorized-negative {
    0% {
      color: var(--color-text);
    }

    10% {
      color: #e85a19;
      // linear-gradient(90deg,#f5ce62,#e85a19)
    }

    60% {
      color: #e85a19;
    }

    70% {
      color: var(--color-text);
    }

    100% {
      color: var(--color-text);
    }
  }
}

.topic {
  &__info {
    display: flex;
    flex-direction: column;
  }

  &__timestamp {
    position: absolute;
    left: 70px;
    bottom: 0;
    transform: translateY(calc(-100% - 8px));

    display: block;
  }

  &__description {
    margin-top: 40px;
    font-size: 18px;
  }
}
</style>