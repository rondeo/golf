/* eslint-disable no-param-reassign */
export default {
  state: {
    language: {
      id: 'en',
      name: 'English',
    },
    languages: [
      {
        id: 'en',
        name: 'English',
      },
      {
        id: 'ru',
        name: 'Русский',
      },
    ],
  },

  getters: {
    language: state => state.language,
    languages: state => state.languages,
  },
  actions: {
    changeLanguage({ commit }, data) {
      localStorage.language = JSON.stringify(data);
      commit('changeLanguage', data);
    },
  },
  mutations: {
    changeLanguage(state, value) {
      state.language = value;
    },
  },
};
