<template>
<div>
  <div class="page-title">
    <h3>Category</h3>
  </div>
  <section>
    <LoaderVue v-if="loading" />
    <div class="row" v-else>
      <category-create @created="addNewCategory"/>
      <category-edit :categories="categories"/>
    </div>
  </section>
</div>
</template>

<script>
import CategoryCreate from '@/components/CategoryCreate.vue'
import CategoryEdit from '@/components/CategoryEdit.vue'
import LoaderVue from '@/components/app/LoaderVue.vue'

export default {
  name: 'categoriesVue',
  data: () => ({
    categories: [],
    loading: true
  }),
  async mounted() {
    this.categories =  await this.$store.dispatch('fetchCategories')
    this.loading = false
    console.log(this.categories);
  },
  components: {
    CategoryCreate,
    CategoryEdit,
    LoaderVue
},
  methods: {
    addNewCategory(category) {
      this.categories.push(category)
      console.log('kategorijos', this.categories);
    }
  }
}
</script>