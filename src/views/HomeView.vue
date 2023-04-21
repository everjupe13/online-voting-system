<script setup>
import IndexPage from '../components/IndexPage.vue'

import { onMounted } from 'vue'



onMounted(async () => {
    const f = async () => {
        // const req = await fetch('http://localhost:8888/online_voting_system/api/auth/signup', {
        const req = await fetch('http://localhost:4545', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({ username: 'admin', password: 'admin' })
        })
        const json = await req.json()
        return json
    }

    console.log(await f())
})

</script>

<template>
    <IndexPage />
</template>
