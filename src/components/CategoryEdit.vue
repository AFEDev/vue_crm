<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>{{ $filters.localizeFilter("Edit") }}</h4>
      </div>

      <form @submit.prevent="submitHandler">
        <div class="input-field">
          <select ref="select" v-model="current">
            <option v-for="c of categories" :key="c.id" :value="c.id">{{ c.title }}</option>
          </select>
          <label>{{ $filters.localizeFilter("Select_cat") }}</label>
        </div>

        <div class="input-field">
          <input
            id="name"
            type="text"
            v-model="title"
            :class="{ invalid: v$.title.$dirty && v$.title.required.$invalid }"
          />
          <label for="name">{{ $filters.localizeFilter("Title") }}</label>
          <span class="helper-text invalid" v-if="v$.limit.$dirty && v$.title.required.$invalid">
            Enter title
          </span>
        </div>

        <div class="input-field">
          <input
            id="limit"
            type="number"
            name="limit"
            v-model.number="limit"
            :class="{ invalid: v$.limit.$dirty && v$.limit.minValue.$invalid }"
          />
          <label htmlFor="limit">{{ $filters.localizeFilter("Limit") }}</label>
          <span v-if="v$.limit.$dirty && v$.limit.minValue.$invalid" class="helper-text invalid">
            {{ $filters.localizeFilter("Messaga_MinimalAmount") }}
            {{ v$.limit.minValue.$params.min }}</span
          >
          <span v-if="v$.limit.$dirty && v$.limit.required.$invalid" class="helper-text invalid">
            {{ $filters.localizeFilter("Message_EnterName") }}
            {{ v$.limit.minValue.$params.min }}</span
          >
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          {{ $filters.localizeFilter("Update") }}
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required, minValue, numeric } from "@vuelidate/validators";

export default {
  props: {
    categories: {
      type: Array,
      required: true,
    },
  },
  data: () => ({
    select: null,
    title: "",
    limit: "",
    current: null,
  }),
  setup: () => ({ v$: useVuelidate() }),
  validations() {
    return {
      title: { required },
      limit: { minValue: minValue(1), numeric, required },
    };
  },
  watch: {
    current(catId) {
      const { title, limit } = this.categories.find((c) => c.id === catId);
      this.title = title;
      this.limit = limit;
    },
  },
  created() {
    const { id, title, limit } = this.categories[0];
    this.current = id;
    this.title = title;
    this.limit = limit;
  },
  async mounted() {
    this.select = M.FormSelect.init(this.$refs.select);
    M.updateTextFields();
  },
  unmounted() {
    if (this.select && this.select.destroy) {
      this.select.destroy();
    }
  },
  methods: {
    async submitHandler() {
      if (this.v$.$invalid) {
        this.v$.$touch();
        return;
      }
      try {
        const categoryData = {
          id: this.current,
          title: this.title,
          limit: this.limit,
        };
        await this.$store.dispatch("updateCategory", categoryData);
        this.$message("Category updated");
        this.$emit("updated", categoryData);
      } catch (e) {
        this.$eMessage("Something wrong");
      }
    },
  },
};
</script>
