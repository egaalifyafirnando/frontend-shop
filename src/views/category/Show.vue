<template>
    <div>
        <div class="mb-5 mt-4">
            <!-- data product -->
            <div class="col">
                <div v-if="products.length > 0" class="row">
                    <div v-for="product in products" v-bind:key="product.id" class="col-md-3 col-6 mb-3">
                        <div class="card h-100 border-0 shadow rounded-md" data-aos="fade-up" data-aos-once="true">
                            <span v-if="product.discount > 0" class="ribbon"></span>
                            <div class="card-img">
                                <img
                                    v-bind:src="product.image"
                                    loading="lazy"
                                    class="w-100"
                                    style="height: 15em; object-fit: cover; border-top-left-radius: 0.25rem; border-top-right-radius: 0.25rem"
                                />
                            </div>

                            <div class="card-body" style="padding: 1rem">
                                <router-link
                                    v-bind:to="{
                                        name: 'detail_product',
                                        params: { slug: product.slug },
                                    }"
                                    class="card-title font-weight-bold text-dark"
                                    style="font-size: 1rem"
                                >
                                    <span v-if="product.title.length < 29" class="title-card">
                                        {{ product.title }}
                                    </span>
                                    <span v-else class="title-card">
                                        {{ product.title.substring(0, 29) + '...' }}
                                    </span>
                                </router-link>

                                <div v-if="product.discount > 0" class="discount">
                                    <small>
                                        <div class="row">
                                            <div class="col-8">
                                                <s>Rp. {{ moneyFormat(product.price) }}</s>
                                            </div>
                                            <div class="col-4 d-flex justify-content-end">
                                                <span class="badge badge-pill badge-discount text-white d-flex align-items-center">{{ product.discount }}% OFF</span>
                                            </div>
                                        </div>
                                    </small>
                                </div>

                                <div v-else>
                                    <small class="d-flex align-items-center">Special price for you</small>
                                </div>

                                <div class="price font-weight-bold mt-3" style="color: #105652; font-size: 1.1rem">Rp. {{ moneyFormat(calculateDiscount(product)) }}</div>
                                <router-link
                                    v-bind:to="{
                                        name: 'detail_product',
                                        params: { slug: product.slug },
                                    }"
                                    class="btn btn-detail btn-md mt-3 btn-block shadow-md text-white font-weight-bold rounded-pill"
                                >
                                    Detail
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>

                <div v-else>
                    <div class="row">
                        <div class="col-md-3 col-6 mb-3" v-for="loader in ContentLoader" v-bind:key="loader">
                            <div class="card h-100 border-0 shadow rounded-md" data-aos="fade-up" data-aos-once="true">
                                <div class="card-body" style="padding: 1rem">
                                    <ContentLoader viewBox="0 0 150 200" :speed="2" primaryColor="#fafafa" secondaryColor="#e2e8f0">
                                        <rect x="21" y="178" rx="10" ry="10" width="111" height="19" />
                                        <rect x="7" y="149" rx="4" ry="4" width="138" height="9" />
                                        <rect x="6" y="3" rx="8" ry="8" width="139" height="136" />
                                        <rect x="7" y="162" rx="4" ry="4" width="71" height="8" />
                                    </ContentLoader>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { ContentLoader } from 'vue-content-loader';

export default {
    name: 'CategoryShowComponent',

    components: {
        ContentLoader,
    },

    setup() {
        const store = useStore();
        const route = useRoute();

        onMounted(() => {
            store.dispatch('category/getProductInCategory', route.params.slug);
        });

        const products = computed(() => {
            return store.state.category.productInCategory;
        });

        return {
            store,
            route,
            products,
            ContentLoader: 4,
        };
    },
};
</script>
