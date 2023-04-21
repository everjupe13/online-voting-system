<template>
    <div class="posts">
        <div class="post" 
            v-for="(post,index) in posts"
            v-bind:key='`${index}-${Math.random()}`'    
        >
            <div class="post__title">{{post.title}}</div>
            <div class="post__body">{{post.body}}</div>
            <button v-on:click='fetchPosts' class="btn btn_large post__btn">More</button>
        </div>
    </div>
</template>

<script>
import { getHttp } from '../http/fetchApi'

export default {
    name: 'AppPosts',
    data: () => ({
        posts: [
            {
                id: 1,
                title: 'Hello Wold!',
                body: 'lorem impsum solom doler'

            },
        ]
    }),
    methods: {
        fetchPosts() {
            getHttp('http://localhost:3000/posts/').then((res) => {
                console.log(res);
            })
        }
    }
}
</script>

<style lang="scss" scoped>
    .post {

        margin-top: 40px;

        padding: 20px 30px;

        border: 1px solid rgba(#d3d3d3, .4);
        border-radius: 5px;

        box-shadow: 2px 2px 2px rgba(#cacaca, .5);

        &:first-child {
            margin-top: 0;
        }

        &__title {

            margin-bottom: 1.5rem;

            font-size: 1.8rem;
            font-weight: 900;    
            color: #141414;        

        }

        &__body {
            font-size: 1.1rem;
        }

        &__btn {
            display: block;
            margin: 30px 0 0 auto;
        }

    }
</style>