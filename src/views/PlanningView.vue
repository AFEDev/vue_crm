<template>
  <div>
    <div class="page-title">
      <h3>{{ $filters.localizeFilter("Menu_planing") }}</h3>
      <h4 v-if="!loading">{{ $filters.currencyFilter(info.bill, "EUR") }}</h4>
    </div>

    <loader-vue v-if="loading" />

    <p class="center" v-else-if="!categories.length">
      There are no categories. <router-link to="/categories"> Add new category</router-link>
    </p>

    <section v-else>
      <div v-for="cat of categories" :key="cat.id">
        <p>
          <strong>{{ cat.title }}:</strong>
          {{ $filters.currencyFilter(cat.spend, "EUR") }} of
          {{ $filters.currencyFilter(cat.limit, "EUR") }}
        </p>
        <div class="progress" v-tooltip="cat.tooltip">
          <div
            class="determinate"
            :class="[cat.progressColor]"
            :style="{ width: cat.progressPercent + '%' }"
          ></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import LoaderVue from "@/components/app/LoaderVue.vue";
import { mapGetters } from "vuex";
import titleMixin from "@/mixins/title.mixin";

export default {
  mixins: [titleMixin],
  title() {
    return this.$filters.localizeFilter("Menu_planing");
  },
  components: { LoaderVue },
  name: "PlaningView",
  data: () => ({
    loading: true,
    categories: [],
  }),
  computed: {
    ...mapGetters(["info"]),
  },
  async mounted() {
    try {
      const records = await this.$store.dispatch("fetchRecords");
      const categories = await this.$store.dispatch("fetchCategories");

      this.categories = categories.map((cat) => {
        const spend = records
          .filter((r) => r.categoryId === cat.id)
          .filter((r) => r.type === "outcome")
          .reduce((total, record) => {
            return (total += record.amount);
          }, 0);
        const percent = (100 * spend) / cat.limit;
        const progressPercent = percent > 100 ? 100 : percent;
        const progressColor = percent < 60 ? "green" : percent < 100 ? "yellow" : "red";

        const tooltipValue = cat.limit - spend;
        const tooltip = `${
          tooltipValue < 0
            ? this.$filters.localizeFilter("LimitExceeded")
            : this.$filters.localizeFilter("LimitLeft")
        } ${this.$filters.currencyFilter(Math.abs(tooltipValue), "EUR")}`;

        return {
          ...cat,
          progressPercent,
          progressColor,
          spend,
          tooltip,
        };
      });

      this.loading = false;
    } catch (e) {}
  },
};
</script>
