import Api from '@/api/Api';

const product = {
    // NAMESPACE
    namespaced: true,

    // STATE
    state: {
        products: [],
        product: {},
    },

    // MUTATIONS
    mutations: {
        GET_PRODUCTS(state, products) {
            state.products = products;
        },

        DETAIL_PRODUCT(state, product) {
            state.product = product;
        },
    },

    // ACTIONS
    actions: {
        getProducts({ commit }) {
            Api.get('/products')
                .then((response) => {
                    commit('GET_PRODUCTS', response.data.products);
                })
                .catch((error) => {
                    console.log(error);
                });
        },

        getDetailProduct({ commit }, slug) {
            Api.get(`/product/${slug}`)
                .then((response) => {
                    commit('DETAIL_PRODUCT', response.data.product);
                })
                .catch((error) => {
                    console.log(error);
                });
        },
    },

    // GETTERS
    getters: {},
};

export default product;
