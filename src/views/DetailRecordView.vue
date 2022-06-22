<template>
  <div>
    <loader-vue v-if="loading" />
    <div v-else-if="record">
      <div class="breadcrumb-wrap">
        <router-link to="/history" class="breadcrumb">{{
          $filters.localizeFilter("History")
        }}</router-link>
        <a @click.prevent class="breadcrumb">
          {{
            record.type === "income"
              ? $filters.localizeFilter("Income")
              : $filters.localizeFilter("Outcome")
          }}
        </a>
      </div>
      <div class="row">
        <div class="col s12 m6">
          <div
            class="card"
            :class="{
              red: record.type === 'outcome',
              green: record.type === 'income',
            }"
          >
            <div class="card-content white-text">
              <p>{{ $filters.localizeFilter("Description") }} {{ record.description }}</p>
              <p>
                {{ $filters.localizeFilter("Sum") }}
                {{ $filters.currencyFilter(record.amount, "EUR") }}
              </p>
              <p>{{ $filters.localizeFilter("Category") }} {{ record.categoryName }}</p>
              <small>{{ $filters.dateFilter(new Date(record.date), "datetime") }}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
    <p class="center" v-else>{{ $filters.localizeFilter("EntryNotFound") }}</p>
  </div>
</template>

<script>
import LoaderVue from "@/components/app/LoaderVue.vue";
import titleMixin from "@/mixins/title.mixin";

export default {
  mixins: [titleMixin],
  title() {
    return this.$filters.localizeFilter(`Menu_history`);
  },
  components: { LoaderVue },
  name: "DetailRecord",
  data: () => ({
    record: null,
    loading: true,
  }),
  async mounted() {
    const id = this.$route.params.id;
    const record = await this.$store.dispatch("fetchRecordById", id);
    const category = await this.$store.dispatch("fetchCategoryById", record.categoryId);

    this.record = {
      ...record,
      categoryName: category.title,
    };

    this.loading = false;
  },
};
</script>
