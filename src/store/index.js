import { createStore } from 'vuex';

import auth from './module/auth';

// EXPORT STORE VUEX
export default createStore({
    modules: {
        auth,
    },
});
