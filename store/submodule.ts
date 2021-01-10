import { getterTree, mutationTree, actionTree } from 'nuxt-typed-vuex';

export const state = () => ({
  firstName: '',
  lastName: '',
});

export type State = ReturnType<typeof state>;

export const getters = getterTree(state, {
  fullName: state => state.firstName + ' ' + state.lastName,
});

export const mutations = mutationTree(state, {
  SET_FIRST_NAME(state, newValue: string) {
    state.firstName = newValue;
  },
  SET_LAST_NAME(state, newValue: string) {
    state.lastName = newValue;
  },
});

export const actions = actionTree(
  { state, getters, mutations },
  {
    initialise({ commit }) {
      commit('SET_FIRST_NAME', 'John');
      commit('SET_LAST_NAME', 'Baker');
    },
    setName({ commit }, newName: string) {
      const names = newName.split(' ');
      commit('SET_FIRST_NAME', names[0]);
      if (names.length > 1) commit('SET_LAST_NAME', names[1]);
    },
  }
);
