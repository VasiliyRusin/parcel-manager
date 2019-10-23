<template>
    <ul class="columns is-centered is-mobile is-multiline">
        <li :key="index" class="column is-full" v-for="(item, index) in items">
            <Item class="card">
                <div class="card-content">
                    <div class="hero">
                        <div class="hero-body">
                            <p class="subtitle">
                                Посылка
                            </p>
                            <p class="title">
                                ID {{ item.id }}
                            </p>
                        </div>
                    </div>
                    <div class="columns">
                        <ul class="column is-6 is-mobile">
                            <li>
                                <span class="has-text-right">Расстояние:</span>
                                <span class="has-text-weight-semibold">{{ item.path }} км</span>
                            </li>
                            <li>
                                <span class="has-text-right">Доставка:</span>
                                <span class="has-text-weight-semibold">
                                    {{ item.worldwide ? 'По миру' : 'По России' }}
                                </span>
                            </li>
                        </ul>
                    </div>
                    <div class="subtitle has-text-right has-text-weight-bold is-large">
                        {{ item.path * (item.worldwide ? 5 : 3) }} руб
                    </div>
                </div>
                <footer class="card-footer" v-if="isAdmin">
                    <b-button
                            @click="$router.push({name: 'edit', params: {id: item.id}})"
                            class="button is-fullwidth is-warning card-footer-item is-radiusless"
                            icon-left="square-edit-outline">
                        Изменить
                    </b-button>
                    <b-button
                            @click="$store.dispatch('deleteParcel', item.id)"
                            class="button is-fullwidth is-danger card-footer-item is-radiusless"
                            icon-left="delete-outline">
                        Удалить
                    </b-button>
                </footer>
            </Item>
        </li>
    </ul>
</template>

<script>
    import Item from "@/components/List/Item";

    export default {
        name: "Items",
        components: { Item },
        props: {
            items: Array
        },
        computed: {
            isAdmin () {
                return this.$store.getters['user/isAdmin'];
            },

            activeParcel: {
                get () {
                    return this.$store.state.activeParcelIndex
                },

                set (value) {
                    return this.$store.commit('updateActiveParcelIndex', value)
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .button {
        height: auto;
    }

    .card {
        ul {
            li {
                gap: 20px;
                display: grid;
                grid-template-columns: 1fr 1fr;
            }
        }
    }
</style>
