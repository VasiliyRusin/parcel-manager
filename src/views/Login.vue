<template>
    <section class="hero is-fullheight-with-navbar">
        <div class="hero-body">
            <div class="container">
                <div class="columns is-centered">
                    <div class="column is-3">
                        <form @submit.prevent.stop="submit">
                            <h2 class="subtitle">
                                Login
                            </h2>
                            <b-message has-icon type="is-danger" v-if="errors.length !== 0">
                                <ul>
                                    <li :key="index" v-for="(error, index) in errors">{{ error }}</li>
                                </ul>
                            </b-message>
                            <b-field label="Name">
                                <b-input v-model="name"></b-input>
                            </b-field>
                            <b-field label="Password">
                                <b-input password-reveal type="Password" v-model="password"></b-input>
                            </b-field>
                            <div class="buttons has-addons is-right">
                                <b-button native-type="submit" type="is-info">Rounded</b-button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
    import LoginValidator from "@/mixins/LoginValidator";

    export default {
        name: "Login",
        mixins: [LoginValidator],
        data () {
            return {
                errors: [],
                name: '',
                password: ''
            }
        },
        methods: {
            submit () {
                if (this.isValid()) {
                    this.$store.commit('user/login', {
                        user: this.name,
                        role: (this.name === 'admin') ? 'admin' : 'user'
                    });
                    this.$router.push({ name: 'list' });
                }
            },

            isValid () {
                this.errors = [];

                if (!this.password) {
                    this.errors.push("Password required");
                } else if (this.passwordValidator(this.password)) {
                    this.errors.push("Password must be minimum 6 chars");
                }

                return this.errors.length === 0;
            }
        }
    };
</script>
