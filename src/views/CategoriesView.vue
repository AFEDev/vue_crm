<template>
<div>
  <div class="page-title">
    <h3>Category</h3>
  </div>
  <section>
    <div class="row">
      <category-create/>
      <category-edit/>
    </div>
  </section>
</div>
</template>

<script>
import CategoryCreate from '@/components/CategoryCreate.vue'
import CategoryEdit from '@/components/CategoryEdit.vue'
export default {
  name: 'categoriesVue',
  components: {
CategoryCreate, CategoryEdit
  },
}
</script>