<script setup>
import { BreadCrumbs } from '@/shared/BreadCrumbs'
import AppButton from '../components/AppButton.vue'
import { useTopicInfo } from '@/modules/topics/useTopicInfo'
import { useRoute } from 'vue-router'
import { reactive } from 'vue'

const route = useRoute()

const { topic } = reactive(await useTopicInfo({ id: route.params.id }))
const breadcrumbs = [{ link: '/', name: 'Home' }, { name: topic.name }]
</script>

<template>
  <section class="page">
    <div class="page__wrapper">
      <div class="page__content">
        <header class="page__header">
          <BreadCrumbs 
            :crumbs="breadcrumbs"
            class="page__header-breadcrumbs"
          />
          <h1 class="title">{{ topic.name }}</h1>
        </header>

        <div class="page__content">

          <div class="page__content-block">
            <div class="votes-progress">
              <div class="votes-progress-track">
                <span class="votes-progress-track__for"></span>
                <span class="votes-progress-track__against"></span>
              </div>
              <div class="votes-progress-controls">
                <AppButton class="votes-progress-controls__btn votes-progress-controls__for">Agree</AppButton>
                <AppButton class="votes-progress-controls__btn votes-progress-controls__against">Disagree</AppButton>
              </div>
            </div>
          </div>

          <div class="page__content-block">
            <p class="common-text">{{ topic.description }}</p>
          </div>
          <!-- {{ topic.createdAt }} <br> -->
          <!-- {{ topic.description }} <br> -->
        </div>
      </div>
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
    }

    &__against {
      display: block;

      width: 25%;

      background: var(--link-gradient);
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
</style>