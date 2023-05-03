<script setup>
import VotePullCard from '@/components/VotePullCard.vue'
</script>

<template>
  <section class="page">
    <div class="page__wrapper">

      <div class="page__content">

        <header class="page__header">
          <h1 class="title">Online voting realtime</h1>
        </header>

        <div class="page__content">
          <h4 style="margin-bottom: 20px">Recent <router-link to="/polls">polls</router-link>:</h4>

          <div class="page__content-block">
            <VotePullCard></VotePullCard>
          </div>
          <div class="page__content-block">
            <VotePullCard></VotePullCard>
          </div>
          <div class="page__content-block">
            <VotePullCard></VotePullCard>
          </div>
          <div class="page__content-block">
            <VotePullCard></VotePullCard>
          </div>

        </div>
      </div>

    </div>
  </section>
</template>

<style lang="scss">

</style>
