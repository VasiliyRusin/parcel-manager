<template>
    <header class="navbar is-fixed-top">
        <div class="navbar-brand">
            <router-link :to="{name: 'list'}" class="has-text-weight-bold navbar-item">Home</router-link>

            <a aria-expanded="false" aria-label="menu" class="navbar-burger" role="button">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
            </a>
        </div>
        <div class="navbar-end">
            <template v-if="isAuthenticated">
                <span class="navbar-item">
                    <span>{{ user }}</span>
                </span>
                <span class="navbar-item">
                    <b-button @click="logout">logout</b-button>
                </span>
            </template>
            <router-link :to="{name: 'login'}" class="navbar-item" v-else>Login</router-link>
        </div>
    </header>
</template>

<script>
    export default {
        name: "Header",
        computed: {
            user () {
                return this.$store.state.user.user;
            },

            isAuthenticated () {
                return this.$store.getters['user/isAuthenticated'];
            }
        },
        methods: {
            logout () {
                this.$store.commit('user/logout');
            }
        }
    }
</script>

<style lang="scss" scoped>
</style>
