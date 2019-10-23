<template>
    <div class="container">
        <div class="columns is-centered is-mobile">
            <div class="column is-4">
                <div class="hero">
                    <div class="hero-body">
                        <h1 class="title" v-if="isCreate">Создать посылку</h1>
                        <h1 class="title" v-else>Изменить посылку</h1>
                    </div>
                </div>
                <form @submit.stop.prevent="submit">
                    <b-field label="Расстояние">
                        <b-numberinput type="is-light" v-model.number="path"></b-numberinput>
                    </b-field>
                    <b-field label="Доставка">
                        <b-dropdown aria-role="list" v-model="worldwide">
                            <button class="button" expanded slot="trigger" type="button">
                                <template v-if="worldwide">
                                    <b-icon icon="earth"></b-icon>
                                    <span>По миру</span>
                                </template>
                                <template v-else>
                                    <b-icon icon="home-group"></b-icon>
                                    <span>По России</span>
                                </template>
                                <b-icon icon="menu-down"></b-icon>
                            </button>

                            <b-dropdown-item :value="true" aria-role="listitem">
                                <div class="media">
                                    <b-icon class="media-left" icon="earth"></b-icon>
                                    <div class="media-content">
                                        <h3>По миру</h3>
                                        <small>5 руб / км</small>
                                    </div>
                                </div>
                            </b-dropdown-item>

                            <b-dropdown-item :value="false" aria-role="listitem">
                                <div class="media">
                                    <b-icon class="media-left" icon="home-group"></b-icon>
                                    <div class="media-content">
                                        <h3>По России</h3>
                                        <small>3 руб / км</small>
                                    </div>
                                </div>
                            </b-dropdown-item>
                        </b-dropdown>
                    </b-field>
                    <div class="hero">
                        <div class="hero-body">
                            <h2 class="subtitle">
                                Стоимость доставки: {{ price }} руб
                            </h2>
                        </div>
                    </div>
                    <b-button class="button is-fullwidth is-success" icon-left="plus-box-outline" native-type="submit"
                              v-if="isCreate">
                        Добавить
                    </b-button>
                    <b-button class="button is-fullwidth is-warning" icon-left="square-edit-outline"
                              native-type="submit"
                              v-else>
                        Изменить
                    </b-button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Form",
        props: {
            isCreate: {
                type: Boolean,
                default: true
            }
        },
        created () {
            if (!this.isCreate) {
                this.$store.dispatch('getParcel', this.$route.params.id).then(() => {
                    this.id = this.parcel.id;
                    this.path = this.parcel.path;
                    this.worldwide = this.parcel.worldwide;
                });
            }
        },
        data () {
            return {
                id: null,
                path: 0,
                worldwide: true
            }
        },
        computed: {
            price () {
                return this.path * (this.worldwide ? 5 : 3)
            },

            parcelData () {
                return {
                    id: this.id,
                    path: this.path,
                    worldwide: this.worldwide
                }
            },

            parcel: {
                get () {
                    return this.$store.getters.getParcel(this.$route.params.id)
                },

                set (value) {
                    if (this.isCreate) {
                        this.$store.dispatch('createParcel', value)
                    } else {
                        this.$store.dispatch('editParcel', {
                            id: this.$route.params.id,
                            value
                        })
                    }
                }
            },
        },

        methods: {
            submit () {
                this.parcel = {
                    id: this.id,
                    path: this.path,
                    worldwide: this.worldwide
                };

                this.$router.push({ name: 'list' })
            }
        }
    };
</script>

<style lang="scss" scoped></style>
