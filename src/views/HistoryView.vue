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
    <history-table :records="items" />

    <PaginateVue
      :page-count="pageCount"
      :click-handler="PageChangeHandler"
      :prev-text="'Prev'"
      :next-text="'Next'"
      :container-class="'pagination center'"
      :page-class="'waves-effect'">
    </PaginateVue>
  </section>
</div>

</template>

<script>
import HistoryTable from '@/components/HistoryTable.vue'
import LoaderVue from '@/components/app/LoaderVue.vue'
import paginationMixin from '@/mixins/pagination.mixin'

export default {
    name: "HistoryView",
    mixins: [paginationMixin],
    data: () => ({
      loading: true,
      records: [],
    }),
    async mounted() {
      this.records = await this.$store.dispatch('fetchRecords')
      const categories = await this.$store.dispatch('fetchCategories')
      this.setupPagination(this.records.map(record => {
        return {
          ...record,
          categoryName: categories.find(c => c.id === record.categoryId).title,
          typeClass: record.type === 'income' ? 'green' : 'red',
          typeText: record.type === 'income' ? 'Income' : 'Outcome',
        }
      }))
      this.loading = false
    },
    methods: {
      PageChangeHandler (pageNum) {
        this.items = this.allItems[pageNum]
      }
    },
    components: {
    HistoryTable,
    LoaderVue,
}
}
</script>