<template>
    <header class="section-header">
        <section class="header-main border-bottom">
            <div class="container-fluid">
                <div class="row align-items-center">
                    <div class="col-md-3 col-4">
                        <router-link v-bind:to="{ name: 'home' }" class="text-decoration-none" data-abc="true">
                            <span class="logo">
                                <img src="@/assets/brand.png" />
                            </span>
                        </router-link>
                    </div>

                    <div class="col-md-5 d-none d-md-block">
                        <div class="input-group w-100">
                            <input
                                type="text"
                                v-model="keywords"
                                class="form-control search-form"
                                style="width: 55%; border: 1px solid #ffffff"
                                name="q"
                                placeholder="mau belanja apa hari ini ?"
                                @keypress.enter="search"
                            />
                            <div class="input-group-append">
                                <button class="btn search-button" @click="search" type="submit">
                                    <i class="fa fa-search"></i>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div class="col-md-4 col-8">
                        <div class="d-flex justify-content-end">
                            <div class="cart-header">
                                <div class="cart-header">
                                    <router-link v-bind:to="{ name: 'cart' }" class="badge badge-pill mt-1">
                                        <i class="fa fa-shopping-cart"></i>
                                        {{ cartCount }} | Rp.
                                        {{ moneyFormat(cartTotal) }}
                                    </router-link>
                                </div>
                            </div>

                            <div class="account">
                                <router-link v-bind:to="{ name: 'login' }" v-if="!isLoggedIn" class="ml-3">
                                    <i class="fa fa-user-circle" style="color: white; font-size: 1.7rem; line-height: 33px"></i>
                                </router-link>
                                <router-link v-bind:to="{ name: 'dashboard' }" v-else class="ml-3">
                                    <i class="fa fa-store-alt" style="color: white; font-size: 1.4rem; line-height: 33px"></i>
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
import { computed, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
    name: 'HeaderComponent',

    setup() {
        const store = useStore();
        const router = useRouter();

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

        // feature search
        let keywords = ref('');
        function search() {
            store.dispatch('product/getSearchProduct', keywords.value);
            router.push({ name: 'search' });
        }

        return {
            store,
            isLoggedIn,
            cartCount,
            cartTotal,
            keywords,
            search,
        };
    },
};
</script>
