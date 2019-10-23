import Vue from "vue";
import Vuex from "vuex";
import user from "@/store/user";
import { createParcel, deleteParcel, editParcel, getParcel, getParcels } from "@/api";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        activeParcelIndex: null,
        parcels: []
    },

    mutations: {
        updateActiveParcelIndex (state, value) {
            state.activeParcelIndex = value;
        },

        updateParcel (state, { id, value }) {
            const index = state.parcels.findIndex(el => el.id === id);

            if (index === -1) {
                state.parcels.push(value)
            } else {
                Vue.set(state.parcels, index, value);
            }
        },

        setParcels (state, value) {
            state.parcels = value;
        },

        updateParcels (state, value) {
            state.parcels = state.parcels.concat(value);
        },

        deleteParcel (state, id) {
            const index = state.parcels.findIndex(el => el.id === id);

            state.parcels.splice(index, 1)
        }
    },

    actions: {
        createParcel ({ commit }, value) {
            createParcel(value).then(response => {
                commit('updateParcel', { id: null, value: response })
            });
        },

        editParcel ({ commit }, { id, value }) {
            editParcel(id, value).then(response => {
                commit('updateParcel', {
                    id: response.id,
                    value: response
                })
            });
        },

        getParcel ({ commit }, id) {
            getParcel(id).then(response => commit('updateParcel', {
                id: response.id,
                value: response
            }))
        },

        getParcels ({ commit }, data) {
            getParcels(data).then(response => commit('updateParcels', response))
        },

        updateParcels ({ commit }, data) {
            getParcels(data).then(response => commit('setParcels', response))
        },

        deleteParcel ({ commit }, id) {
            deleteParcel(id).then(() => commit('deleteParcel', id))
        }
    },

    getters: {
        activeParcel: (state) => state.parcels[state.activeParcelIndex] || {},
        getParcel: (state) => (id) => state.parcels.find(el => el.id === id) || {}
    },

    modules: {
        user
    }
});
