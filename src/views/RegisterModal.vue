<template>
    <form class="card auth-card" @submit.prevent="submitHandler">
  <div class="card-content">
    <span class="card-title">Home bookkeeping</span>
    <div class="input-field">
      <input
          id="email"
          type="text"
          v-model.trim="email"
      >
      <label for="email">Email</label>
      <small 
      class="error" 
      v-for="error of v$.email.$errors" 
      :key="error.$uid"
      ><br>{{error.$message}}</small>
    </div>
    <div class="input-field">
      <input
          id="password"
          type="password"
          v-model.trim="password"
      >
      <label for="password">Password</label>
      <small 
        class="error"
        v-for="error of v$.password.$errors"
        :key="error.$uid"
        ><br>{{error.$message}}</small>
    </div>
    <div class="input-field">
      <input
          id="name"
          type="text"
          v-model.trim="name"
      >
      <label for="name">Name</label>
      <small 
      class="error"
      v-for="error of v$.name.$errors"
      :key="error.$uid"
      >{{error.$message}}</small>
    </div>
    <p>
      <label>
        <input type="checkbox" v-model="agree" />
        <span>I accept rules</span>
        <small 
          class="error"
          v-for="error of v$.agree.$errors"
          :key="error.$uid"
        ><br>{{error.$message}}</small>
      </label>
    </p>
  </div>
  <div class="card-action">
    <div>
      <button
          class="btn waves-effect waves-light auth-submit"
          type="submit"
      >
        Register
        <i class="material-icons right">send</i>
      </button>
    </div>
    <p class="center">
      Already registered? 
      <router-link to="/login">Login!</router-link>
    </p>
  </div>
</form>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required, email, helpers, minLength, maxLength } from "@vuelidate/validators";
import { containsNumber, containsUppercase, containsLowercase, isChecked } from "@/utils/validators";

export default {
  name: 'RegisterModel',
  setup () {
    return {
      v$: useVuelidate()
    }
  },
  data() { 
    return {
    email: '',
    password: '',
    name: '',
    agree: false,
    }
  },
  validations() {
    return {
      email: {email, required},
      password: {
      required,
      minLength: minLength(8),    
      maxLength: maxLength(20), 
      containsLowercase : helpers.withMessage('Passwords must contain: a minimum of 1 lower case letter [a-z] ', containsLowercase), 
      containsUppercase : helpers.withMessage('Passwords must contain: a minimum of 1 upper case letter [A-Z]', containsUppercase),
      containsNumber: helpers.withMessage('Passwords must contain: a minimum of 1 numeric character [0-9]', containsNumber),
      },
      name: {
      required,
      minLength : minLength(2),
      maxLength : maxLength(10)
      },
      agree: { isChecked : helpers.withMessage('You must agree with terms to continue', isChecked)
      }
    }
  },
  methods: {
  async submitHandler() {
       this.v$.$touch()
        if (this.v$.$error) return;

    const formData = {
      email: this.email,
      password: this.password,
      name: this.name,
    }

    try {
      await this.$store.dispatch('register', formData)
      this.$router.push('/')
    } catch (e) {}

      }
  }
}
</script>