<template>
    <div>
  <div class="page-title">
    <h3>History</h3>
  </div>

<div class="row">
  <div class="history-chart col s12 m6">
      <Pie
    :chart-options="chartOptions"
    :chart-data="chartData"
  />
  </div>
  
  <div class="history-chart col s12 m6">
      <Pie
    :chart-options="chartOptions"
    :chart-data="incomeChartData"
  />
  </div>
</div>
  <LoaderVue v-if="loading" />

  <p class="center" v-else-if="!records.length">There are no history.
  <router-link to="/record">Create first entry!</router-link>
  </p>

  <section v-else>
    <history-table :records="items" />

    <PaginateVue
      v-model="page"
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
import { Pie } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale,} from 'chart.js'
ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale)


export default {
    name: "HistoryView",
    mixins: [paginationMixin],
    data: () => ({
      loading: true,
      records: [],
      incomeChartData: {
        labels: [],
      datasets: [
        {
          label: 'Outcomes',
          backgroundColor: ['#DAF7A6', '#F4D977', '#B6D4FF', '#FFB6BB'],
          data: [] },
      ]
      },
      chartData: {
      labels: [],
      datasets: [
        {
          label: 'Outcomes',
          backgroundColor: ['#DAF7A6', '#F4D977', '#B6D4FF', '#FFB6BB'],
          data: [] },
      ]
    },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false
      },
    }),
    async mounted() {
      this.records = await this.$store.dispatch('fetchRecords')
      const categories = await this.$store.dispatch('fetchCategories')

      this.setup(categories)
      this.renderChart(categories)

      this.loading = false
    },
    components: {
    HistoryTable,
    LoaderVue,
    Pie
    },
  methods: {
    setup (categories) {
      this.setupPagination(this.records.map(record => {
        return {
        ...record,
          categoryName: categories.find(c => c.id === record.categoryId).title,
          typeClass: record.type === 'income' ? 'green' : 'red',
          typeText: record.type === 'income' ? 'Income' : 'Outcome',
        }
      }))
    },
    renderChart (categories) {
      this.chartData.labels = categories.map(c => c.title);

      this.chartData.datasets[0].data = categories.map(c => {
        return this.records.reduce((total, r) => {
          if (r.categoryId === c.id && r.type === 'outcome') {
            total += r.amount
          }
          return total
        }, 0)
      })

      this.incomeChartData.labels = categories.map(c => c.title);

      this.incomeChartData.datasets[0].data = categories.map(c => {
        return this.records.reduce((total, r) => {
          if (r.categoryId === c.id && r.type === 'income') {
            total += r.amount
          }
          return total
        }, 0)
      })
    }
  }
}
</script>