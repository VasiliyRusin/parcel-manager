<template>
    <div class="container">
        <div class="section is-paddingless">
            <div class="columns is-centered">
                <div class="column is-8-desktop is-6-widescreen is-mobile">
                    <section class="container has-text-centered">
                        <router-link :to="{name: 'add'}" v-if="isAdmin">
                            <b-button class="button is-fullwidth is-success is-medium" icon-left="plus-box-outline">
                                Добавить
                            </b-button>
                        </router-link>
                    </section>
                    <section class="section">
                        <Items :items="parcels"></Items>
                    </section>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState } from "vuex";
    import Items from "@/components/List/Items";

    export default {
        name: "List",
        components: { Items },
        created () {
            this.$store.dispatch('updateParcels');
        },
        computed: {
            ...mapState([
                'parcels'
            ]),

            isAdmin () {
                return this.$store.getters['user/isAdmin'];
            }
        }
    };
</script>

<style lang="scss" scoped></style>
