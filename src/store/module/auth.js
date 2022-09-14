import Api from '../../api/Api';

const auth = {
    // NAMESPACE
    namespaced: true,

    // STATE
    state: {
        // STATE TOKEN FROM LOCAL STORAGE
        token: localStorage.getItem('token') || '',

        // STATE USER FROM LOCAL STORAGE
        user: JSON.parse(localStorage.getItem('user')) || {},
    },

    // MUTATIONS
    mutations: {
        // UPDATE STATE TOKEN AND STATE USER FROM RESPONSE VALUE
        AUTH_SUCCESS(state, token, user) {
            state.token = token;
            state.user = user;
        },

        // UPDATE STATE USER FROM RESULT RESPONSE REGISTER/LOGIN
        GET_USER(state, user) {
            state.user = user;
        },

        // UPDATE STATE TO EMPTY VALUE
        AUTH_LOGOUT(state) {
            state.token = '';
            state.user = {};
        },
    },

    // ACTIONS
    actions: {
        register({ commit }, user) {
            // DEFINE CALLBACK PROMISE
            return new Promise((resolve, reject) => {
                // SEND DATA TO SERVER DATABASE
                Api.post('/register', {
                    name: user.name,
                    email: user.email,
                    password: user.password,
                    password_confirmation: user.password_confirmation,
                })
                    .then((response) => {
                        // DEFINE VARIABLE WITH VALUE RESPONSE FROM SERVER
                        const token = response.data.token;
                        const user = response.data.user;

                        // SET LOCALSTORAGE FOR SAVE THE TOKEN AND USER DATA
                        localStorage.setItem('token', token);
                        localStorage.setItem('user', JSON.stringify(user));

                        // SET DEFAULT HEADER AXIOS WITH THE TOKEN
                        Api.defaults.headers.common['Authorization'] = 'Bearer ' + token;

                        // COMMIT AUTH SUCCESS TO MUTATION
                        commit('AUTH_SUCCESS', token, user);

                        // RESOLVE TO COMPONENT WITH RESULT RESPONSE
                        resolve(response);
                    })
                    .catch((error) => {
                        // IF FAILED, REMOVE LOCALSTORAGE WITH KEY TOKEN
                        localStorage.removeItem('token');

                        // REJECT TO COMPONENT WITH RESULT RESPONSE
                        reject(error.response.data);
                    });
            });
        },

        getUser({ commit }) {
            // GET DATA TOKEN FROM LOCAL STORAGE
            const token = localStorage.getItem('token');

            // SET DEFAULT HEADER AXIOS WITH THE TOKEN
            Api.defaults.headers.common['Authorization'] = 'Bearer ' + token;

            // get DATA FROM SERVER DATABASE
            Api.get('/user').then((response) => {
                commit('GET_USER', response.data.user);
            });
        },

        logout({ commit }) {
            // DEFINE CALLBACK PROMISE
            return new Promise((resolve) => {
                // COMMIT TO MUTATION "AUTH_LOGOUT"
                commit('AUTH_LOGOUT');

                // REMOVE VALUE FROM LOCAL STORAGE
                localStorage.removeItem('token');
                localStorage.removeItem('user');

                // DELETE HEADER AXIOS
                delete Api.defaults.headers.common['Authorization'];

                // RETURN RESOLVE TO COMPONENT
                resolve();
            });
        },

        login({ commit }, user) {
            // DEFINE CALLBACK PROMISE
            return new Promise((resolve, reject) => {
                // SEND DATA TO SERVER DATABASE
                Api.post('/login', {
                    email: user.email,
                    password: user.password,
                })
                    .then((response) => {
                        // DEFINE VARIABLE WITH VALUE RESPONSE FROM SERVER
                        const token = response.data.token;
                        const user = response.data.user;

                        // SET LOCALSTORAGE FOR SAVE THE TOKEN AND USER DATA
                        localStorage.setItem('token', token);
                        localStorage.setItem('user', JSON.stringify(user));

                        // SET DEFAULT HEADER AXIOS WITH THE TOKEN
                        Api.defaults.headers.common['Authorization'] = 'Bearer ' + token;

                        // COMMIT "AUTH_SUCCESS" TO MUTATION
                        commit('AUTH_SUCCESS', token, user);

                        // COMMIT "GET_USER" TO MUTATION
                        commit('GET_USER', user);

                        // RESOLVE TO COMPONENT WITH RESULT RESPONSE
                        resolve(response);
                    })
                    .catch((error) => {
                        // IF FAILED, REMOVE "TOKEN" FROM LOCAL STORAGE
                        localStorage.removeItem('token');

                        // REJECT TO COMPONENT WITH RESULT RESPONSE
                        reject(error.response.data);
                    });
            });
        },
    },

    // GETTERS
    getters: {
        // GET NAME FOR DASHBOARD PAGE
        currentUser(state) {
            return state.user;
        },

        // AUTHENTICATION HANDLING
        isLoggedIn(state) {
            return state.token;
        },
    },
};

export default auth;
