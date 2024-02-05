import { createStore } from 'vuex';

export default createStore({
    state: {
        isAuthenticated: false,
    },
    mutations: {
        setAuthentication(state, status) {
            state.isAuthenticated = status;
        }
    },
    actions: {
        login({ commit }) {
            commit('setAuthentication', true);
        },
        logout({ commit }) {
            commit('setAuthentication', false);
        }
    }
});
