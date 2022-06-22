<template>
  <div>
    <div class="page-title">
      <h3>{{ $filters.localizeFilter("Category") }}</h3>
    </div>
    <section>
      <LoaderVue v-if="loading" />
      <div class="row" v-else>
        <category-create @created="addNewCategory" />

        <category-edit
          v-if="categories.length"
          :categories="categories"
          :key="categories.length + updateCount"
          @updated="updateCategory"
        />
        <p v-else class="center">{{ $filters.localizeFilter("No_categories") }}</p>
      </div>
    </section>
  </div>
</template>

<script>
import CategoryCreate from "@/components/CategoryCreate.vue";
import CategoryEdit from "@/components/CategoryEdit.vue";
import LoaderVue from "@/components/app/LoaderVue.vue";
import titleMixin from "@/mixins/title.mixin";

export default {
  mixins: [titleMixin],
  title() {
    return this.$filters.localizeFilter(`Menu_category`);
  },
  name: "categoriesVue",
  data: () => ({
    categories: [],
    loading: true,
    updateCount: 0,
  }),
  async mounted() {
    this.categories = await this.$store.dispatch("fetchCategories");
    this.loading = false;
  },
  components: {
    CategoryCreate,
    CategoryEdit,
    LoaderVue,
  },
  methods: {
    addNewCategory(category) {
      this.categories.push(category);
    },
    updateCategory(category) {
      const idx = this.categories.findIndex((c) => c.id === category.id);
      this.categories[idx].title = category.title;
      this.categories[idx].limit = category.limit;
      this.updateCount++;
    },
  },
};
</script>
