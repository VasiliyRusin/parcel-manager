export default {
    namespaced: true,
    state: {
        user: null,
        role: null,
    },
    mutations: {
        login (state, { user, role }) {
            state.user = user;
            state.role = role;
        },

        logout (state) {
            state.user = null;
            state.role = null;
        }
    },
    getters: {
        isAuthenticated: (state) => state.user != null,
        isAdmin: (state) => state.role === 'admin'
    }
}
