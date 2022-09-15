import Api from '@/api/Api';

const category = {
    // NAMESPACE
    namespaced: true,

    // STATE
    state: {
        categories: [],
    },

    // MUTATIONS
    mutations: {
        GET_CATEGORIES(state, categories) {
            state.categories = categories;
        },
    },

    // ACTIONS
    actions: {
        getCategories({ commit }) {
            Api.get('/categories')
                .then((response) => {
                    commit('GET_CATEGORIES', response.data.categories);
                })
                .catch((error) => {
                    console.log(error);
                });
        },
    },

    // GETTERS
    getters: {},
};

export default category;
