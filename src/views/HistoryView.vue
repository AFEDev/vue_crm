<template>
    <div>
  <div class="page-title">
    <h3>History</h3>
  </div>

  <div class="history-chart">
  </div>

  <LoaderVue v-if="loading" />

  <p class="center" v-else-if="!records.length">There are no history.
  <router-link to="/record">Create first entry!</router-link>
  </p>

  <section v-else>
    <history-table :records="records" />
  </section>
</div>

</template>

<script>
import HistoryTable from '@/components/HistoryTable.vue'
import LoaderVue from '@/components/app/LoaderVue.vue'

export default {
    name: "HistoryView",
    data: () => ({
      loading: true,
      records: [],
      categories: [],
    }),
    async mounted() {
      const records = await this.$store.dispatch('fetchRecords')
      this.categories = await this.$store.dispatch('fetchCategories')
      this.records = records.map(record => {
        return {
          ...record,
          categoryName: this.categories.find(c => c.id === record.categoryId).title,
          typeClass: record.type === 'income' ? 'green' : 'red',
          typeText: record.type === 'income' ? 'Income' : 'Outcome',
        }
      })
      this.loading = false
    },
    components: {
    HistoryTable,
    LoaderVue
}
}
</script>