<template>
  <div>
  <div class="page-title">
    <h3>Balance</h3>

    <button class="btn waves-effect waves-light btn-small">
      <i class="material-icons">refresh</i>
    </button>
  </div>

  <div class="row">
<home-bill></home-bill>
<home-currency></home-currency>


  </div>
</div>
</template>

<script>

import HomeBill from '@/components/HomeBill.vue';
import HomeCurrency from '@/components/HomeCurrency.vue';

export default {
  components: { HomeCurrency, HomeBill },
  name: 'HomeView',
};
</script>
