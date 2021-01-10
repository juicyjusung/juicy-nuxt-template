import { getterTree, mutationTree, actionTree } from 'nuxt-typed-vuex';
import { ResponseType, User } from '~/types';

export type AuthLoginRequest = Pick<User, 'email'> & { password: string };
export type CreateUserRequest = Pick<User, 'name' | 'email'> & { password: string };

export type CreateUserPayload = Required<CreateUserRequest> & { rePassword: string };

export type UserResponse = ResponseType<'user', User>;

export const state = () => ({
  user: null as User | null,
});

export const getters = getterTree(state, {
  getUser: state => state.user,
});

export const mutations = mutationTree(state, {
  setUser(state, payload: User | null) {
    state.user = payload;
  },
});

export const actions = actionTree(
  { state, getters, mutations },
  {
    initialise({ commit }) {
      commit('setUser', null);
    },
  }
);
