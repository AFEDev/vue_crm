<template>
  <div>
    <div class="page-title">
      <h3>{{ $filters.localizeFilter("NewEntry") }}</h3>
    </div>

    <LoaderVue v-if="loading" />

    <p class="center" v-else-if="!categories.length">
      There are no categories. <router-link to="/categories"> Add new category</router-link>
    </p>

    <form class="form" v-else @submit.prevent="submitHandler">
      <div class="input-field">
        <select ref="select" v-model="category">
          <option v-for="c of categories" :key="c.id" :value="c.id">{{ c.title }}</option>
        </select>
        <label>{{ $filters.localizeFilter("Select_cat") }}</label>
      </div>

      <p>
        <label>
          <input class="with-gap" name="type" type="radio" value="income" v-model="type" />
          <span>{{ $filters.localizeFilter("Income") }}</span>
        </label>
      </p>

      <p>
        <label>
          <input class="with-gap" name="type" type="radio" value="outcome" v-model="type" />
          <span>{{ $filters.localizeFilter("Expenses") }}</span>
        </label>
      </p>

      <div class="input-field">
        <input
          id="amount"
          type="number"
          v-model.number="amount"
          :class="{
            invalid:
              v$.amount.$dirty && (v$.amount.minValue.$invalid || v$.amount.required.$invalid),
          }"
        />
        <label for="amount">{{ $filters.localizeFilter("Amount") }}</label>
        <span
          class="helper-text invalid"
          v-if="v$.amount.$dirty && (v$.amount.minValue.$invalid || v$.amount.required.$invalid)"
        >
          {{ $filters.localizeFilter("Messaga_MinimalAmount") }}
          {{ v$.amount.minValue.$params.min }}</span
        >
      </div>

      <div class="input-field">
        <input
          id="description"
          type="text"
          v-model="description"
          :class="{ invalid: v$.description.$dirty && v$.description.required.$invalid }"
          data-length="20"
          ref="countSymbols"
        />
        <label for="description">{{ $filters.localizeFilter("Description") }}</label>
        <span
          class="helper-text invalid"
          v-if="v$.description.$dirty && v$.description.required.$invalid"
          >{{ $filters.localizeFilter("Message_EnterTitle") }}</span
        >
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        {{ $filters.localizeFilter("Create") }}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import LoaderVue from "@/components/app/LoaderVue.vue";
import useVuelidate from "@vuelidate/core";
import { required, minValue, numeric } from "@vuelidate/validators";
import { mapGetters } from "vuex";
import titleMixin from "@/mixins/title.mixin";

export default {
  mixins: [titleMixin],
  title() {
    return this.$filters.localizeFilter("Menu_entry");
  },
  name: "recordView",
  data: () => ({
    loading: true,
    select: null,
    categories: [],
    category: null,
    type: "income",
    amount: "",
    description: "",
    countSymbols: "",
  }),
  setup: () => ({ v$: useVuelidate() }),
  async mounted() {
    this.categories = await this.$store.dispatch("fetchCategories");
    this.loading = false;

    if (this.categories.length) {
      this.category = this.categories[0].id;
    }

    setTimeout(() => {
      this.select = M.FormSelect.init(this.$refs.select);
      M.updateTextFields();
    }, 0);
  },
  unmounted() {
    if (this.select && this.select.destroy) {
      this.select.destroy();
    }
  },
  validations() {
    return {
      description: { required },
      amount: { minValue: minValue(1), numeric, required },
    };
  },
  computed: {
    ...mapGetters(["info"]),
    canCreateRecord() {
      if (this.type === "income") {
        return true;
      }
      return this.info.bill >= this.amount;
    },
  },
  methods: {
    async submitHandler() {
      if (this.v$.$invalid) {
        this.v$.$touch();
        return;
      }
      if (this.canCreateRecord) {
        try {
          await this.$store.dispatch("createRecord", {
            categoryId: this.category,
            amount: this.amount,
            description: this.description,
            type: this.type,
            date: new Date().toJSON(),
          });
          const bill =
            this.type === "income" ? this.info.bill + this.amount : this.info.bill - this.amount;

          await this.$store.dispatch("updateInfo", { bill });
          this.$message("Entry created succesfuly");
          this.v$.$reset();
          this.amount = "";
          this.description = "";
        } catch (e) {}
      } else {
        this.$message(`Not enought money (${this.amount - this.info.bill})`);
      }
    },
  },
  components: { LoaderVue },
};
</script>
