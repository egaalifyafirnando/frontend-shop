<template>
    <header class="section-header">
        <section class="header-main border-bottom">
            <div class="container-fluid">
                <div class="row align-items-center">
                    <div class="col-md-3 col-7">
                        <router-link v-bind:to="{ name: 'home' }" class="text-decoration-none" data-abc="true">
                            <span class="logo"><i class="fa fa-apple-alt"></i> APPLE STORE</span>
                        </router-link>
                    </div>
                    <div class="col-md-5 d-none d-md-block">
                        <form class="search-wrap">
                            <div class="input-group w-100">
                                <input
                                    type="text"
                                    class="form-control search-form"
                                    style="width: 55%; border: 1px solid #ffffff"
                                    name="q"
                                    placeholder="mau beli apa hari ini ?"
                                />
                                <div class="input-group-append">
                                    <button class="btn search-button" type="submit"><i class="fa fa-search"></i></button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="col-md-4 col-5">
                        <div class="d-flex justify-content-end">
                            <div class="cart-header">
                                <router-link
                                    v-bind:to="{ name: 'cart' }"
                                    class="btn search-button btn-md"
                                    style="color: #ffffff; background-color: #6677ef; border-color: #ffffff"
                                >
                                    <i class="fa fa-shopping-cart"></i> {{ cartCount }} | Rp. {{ moneyFormat(cartTotal) }}
                                </router-link>
                            </div>

                            <div class="account">
                                <router-link v-bind:to="{ name: 'login' }" v-if="!isLoggedIn" class="btn search-button btn-md d-none d-md-block ml-4">
                                    <i class="fa fa-user-circle"></i> ACCOUNT
                                </router-link>
                                <router-link v-bind:to="{ name: 'dashboard' }" v-else class="btn search-button btn-md d-none d-md-block ml-4">
                                    <i class="fa fa-tachometer-alt"></i> DASHBOARD
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </header>
</template>

<script>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';

export default {
    name: 'HeaderComponent',

    setup() {
        const store = useStore();

        // DECISION FOR HEADER BUTTON (ACCOUNT/DASHBOARD)
        const isLoggedIn = computed(() => {
            // GET GETTER "isLoggedIn" FROM MODULE "AUTH"
            return store.getters['auth/isLoggedIn'];
        });

        // GET VALUE "cartCount" FROM GETTERS IN MODULE "CART"
        const cartCount = computed(() => {
            return store.getters['cart/cartCount'];
        });

        // GET VALUE "cartTotal" FROM GETTERS IN MODULE "CART"
        const cartTotal = computed(() => {
            return store.getters['cart/cartTotal'];
        });

        // CHECKING "token" FROM STATE IN MODULE "AUTH"
        onMounted(() => {
            const token = store.state.auth.token;

            // IF NOT HAVE TOKEN, RETURN
            if (!token) {
                return;
            }
            // RUN ACTION "cartCount" IN MODULE "CART"
            store.dispatch('cart/cartCount');
            // RUN ACTION "cartTotal" IN MODULE "CART"
            store.dispatch('cart/cartTotal');
        });

        return {
            store,
            isLoggedIn,
            cartCount,
            cartTotal,
        };
    },
};
</script>
