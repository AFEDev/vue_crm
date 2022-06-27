<template>
  <div>
    <div class="page-title">
      <h3>{{ $filters.localizeFilter("ProfileTitle") }}</h3>
    </div>
    <form class="form" @submit.prevent="submitHandler">
      <div class="input-field">
        <input id="name" type="text" v-model.trim="name" />
        <label for="name" class="flow-text">{{ $filters.localizeFilter("Name") }}</label>
        <small class="error" v-for="error of v$.name.$errors" :key="error.$uid">{{
          error.$message
        }}</small>
      </div>
      <div class="switch">
        <label class="flow-text">
          Lietuviškai
          <input type="checkbox" v-model="isEnLocale" />
          <span class="lever"></span>
          English
        </label>
      </div>
      <button class="btn waves-effect waves-light" type="submit">
        {{ $filters.localizeFilter("Update") }}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required, minLength, maxLength } from "@vuelidate/validators";
import { mapGetters, mapActions } from "vuex";
import titleMixin from "@/mixins/title.mixin";
import filters from "@/filters/filters";

export default {
  mixins: [titleMixin],
  title() {
    return filters.localizeFilter("ProfileTitle");
  },
  data: () => ({
    name: "",
    isEnLocale: true,
  }),
  setup() {
    return { v$: useVuelidate() };
  },
  validations: {
    name: {
      required,
      minLength: minLength(2),
      maxLength: maxLength(10),
    },
  },
  mounted() {
    this.name = this.info.name;
    this.isEnLocale = this.info.locale === "en-US";
    setTimeout(() => {
      M.updateTextFields();
    }, 0);
  },
  computed: {
    ...mapGetters(["info"]),
  },
  methods: {
    ...mapActions(["updateInfo"]),
    async submitHandler() {
      this.v$.$touch();
      if (this.v$.$error) return;

      try {
        await this.updateInfo({
          name: this.name,
          locale: this.isEnLocale ? "en-US" : "lt-LT",
        });
      } catch (e) {}
    },
  },
};
</script>

<style scoped>
.switch {
  margin-bottom: 2rem;
}
</style>
>
