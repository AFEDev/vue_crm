<template>
  <table class="responsive-table">
    <thead>
      <tr>
        <th>#</th>
        <th>{{ $filters.localizeFilter("Sum") }}</th>
        <th>{{ $filters.localizeFilter("Date") }}</th>
        <th>{{ $filters.localizeFilter("Category") }}</th>
        <th>{{ $filters.localizeFilter("Type") }}</th>
        <th>{{ $filters.localizeFilter("Open") }}</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="record of records" :key="record.id">
        <td>{{ record.index }}.</td>
        <td>{{ $filters.currencyFilter(record.amount, "EUR") }}</td>
        <td>{{ $filters.dateFilter(new Date(record.date), "datetime") }}</td>
        <td>{{ record.categoryName }}</td>
        <td>
          <span :class="[record.typeClass]" class="white-text badge red">{{
            record.typeText
          }}</span>
        </td>
        <td>
          <button
            v-tooltip="$filters.localizeFilter('Open')"
            class="btn-small btn"
            @click="$router.push('/detail/' + record.id)"
          >
            <i class="material-icons">open_in_new</i>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    records: {
      required: true,
      type: Array,
    },
  },
};
</script>
