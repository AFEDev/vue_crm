<template>
  <div>
    <div class="page-title">
      <h3>{{ $filters.localizeFilter("Balance") }}</h3>

      <button class="btn waves-effect waves-light btn-small" @click="refresh">
        <i class="material-icons">refresh</i>
      </button>
    </div>
    <LoaderVue v-if="loading" />
    <div v-else class="row">
      <home-bill :rates="currency.rates" />
      <home-currency :rates="currency.rates" :date="currency.date" />
    </div>
  </div>
</template>

<script>
import HomeBill from "@/components/HomeBill.vue";
import HomeCurrency from "@/components/HomeCurrency.vue";
import LoaderVue from "@/components/app/LoaderVue.vue";
import titleMixin from "@/mixins/title.mixin";

export default {
  mixins: [titleMixin],
  title() {
    return this.$filters.localizeFilter("Menu_balance");
  },
  name: "HomeView",
  data: () => ({
    loading: true,
    currency: null,
  }),
  async mounted() {
    this.currency = await this.$store.dispatch("fetchCurrency");
    this.loading = false;
  },
  methods: {
    async refresh() {
      this.loading = true;
      this.currency = await this.$store.dispatch("fetchCurrency");
      this.loading = false;
    },
  },
  components: { HomeCurrency, HomeBill, LoaderVue },
};
</script>
