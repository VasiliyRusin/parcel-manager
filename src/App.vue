<template>
    <main id="app">
        <Header></Header>
        <router-view/>
    </main>
</template>

<style lang="scss">
    // Import Bulma and Buefy styles
    @import "~bulma";
    @import "~buefy/src/scss/buefy";
    @import url("https://cdn.materialdesignicons.com/4.5.95/css/materialdesignicons.min.css");

    #app {
        font-family: "Avenir", Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;

        color: #2c3e50;
    }
</style>
<script>
    import Header from "@/components/Header";

    export default {
        components: { Header }
    }
</script>
