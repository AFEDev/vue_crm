<template>
  <div>
  <div class="page-title">
    <h3>Balance</h3>

    <button class="btn waves-effect waves-light btn-small">
      <i class="material-icons">refresh</i>
    </button>
  </div>
  <LoaderVue v-if="loading" />
  <div v-else class="row">
<home-bill
  :rates="currency.rates"
/>
<home-currency></home-currency>


  </div>
</div>
</template>

<script>

import HomeBill from '@/components/HomeBill.vue';
import HomeCurrency from '@/components/HomeCurrency.vue';
import LoaderVue from '@/components/app/LoaderVue.vue';

export default {
  name: 'HomeView',
  data: () => ({
    loading: true,
    currency: null
  }),
  async mounted() {
     this.currency = await this.$store.dispatch('fetchCurrency')
     console.log(this.currency.rates);
     this.loading = false
  },
  components: { HomeCurrency, HomeBill, LoaderVue },
};
</script>
