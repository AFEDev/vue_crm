<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title">Home bookkeeping</span>
      <div class="input-field">
        <input id="email" type="text" v-model.trim="email" />
        <label for="email">Email<span class="required">*</span></label>
        <small class="error" v-for="(error, index) of v$.email.$errors" :key="index">
          {{ error.$message }}
        </small>
      </div>
      <div class="input-field">
        <label for="email">Password <span class="required">*</span></label>
        <input id="email" type="text" v-model.trim="password" />
        <small class="error" v-for="(error, index) of v$.password.$errors" :key="index">
          <br />{{ error.$message }}.
        </small>
      </div>
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          Enter
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Don't have an account?
        <router-link to="/register">Register</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { email, required, minLength, helpers } from "@vuelidate/validators";
import { containsUppercase, containsLowercase, containsNumber } from "../utils/validators";
import messages from "@/utils/messages";
import titleMixin from "@/mixins/title.mixin";

export default {
  mixins: [titleMixin],
  title() {
    return this.$filters.localizeFilter("Login");
  },
  name: "loginModal",
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      email: "",
      password: "",
    };
  },
  validations() {
    return {
      email: { email, required },
      password: {
        required,
        minLength: minLength(8),
        containsUppercase: helpers.withMessage(
          " Passwords must contain: a minimum of 1 upper case letter [A-Z] ",
          containsUppercase
        ),
        containsLowercase: helpers.withMessage(
          " Passwords must contain: a minimum of 1 lower case letter [a-z] ",
          containsLowercase
        ),
        containsNumber: helpers.withMessage(
          " Passwords must contain: a minimum of 1 numeric character [0-9] ",
          containsNumber
        ),
      },
    };
  },
  mounted() {
    if (messages[this.$route.query.message]) {
      this.$message(messages[this.$route.query.message]);
    }
  },
  methods: {
    async submitHandler() {
      this.v$.$touch();
      if (this.v$.$error) return;

      const formData = {
        email: this.email,
        password: this.password,
      };

      try {
        await this.$store.dispatch("login", formData);
        await this.$store.dispatch();
        this.$router.push("/");
      } catch (e) {}
    },
  },
};
</script>
