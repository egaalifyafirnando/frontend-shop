<template>
    <div class="card border-0 shadow rounded">
        <div class="card-body">
            <h5 class="font-weight-bold"><i class="fa fa-shopping-bag"></i> KATEGORI</h5>
            <hr />
            <ul class="list-group">
                <router-link
                    v-bind:to="{ name: 'detail_category', params: { slug: category.slug } }"
                    v-for="category in categories"
                    v-bind:key="category.id"
                    class="list-group-item shadow-sm font-weight-bold text-decoration-none text-dark"
                >
                    <img v-bind:src="category.image" style="width: 35px" /> {{ category.name }}
                </router-link>

                <router-link v-bind:to="{ name: 'categories' }" class="list-group-item text-center active shadow-sm font-weight-bold text-decoration-none">
                    LIHAT KATEGORI LAINNYA <i class="fa fa-long-arrow-alt-right"></i>
                </router-link>
            </ul>
        </div>
    </div>
</template>

<script>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';

export default {
    name: 'CategoryComponent',

    setup() {
        const store = useStore();

        onMounted(() => {
            // RUN ACTION "getCategories" IN MODULE "CATEGORY"
            store.dispatch('category/getCategories');
        });

        const categories = computed(() => {
            // GET VALUE "categories" FROM STATE IN MODULE "CATEGORY"
            return store.state.category.categories;
        });

        return {
            categories,
        };
    },
};
</script>
