<template>
    <div class="col s12 m6">
        <div>
          <div class="page-subtitle">
            <h4>Create</h4>
          </div>

          <form @submit.prevent="submitHandler">
            <div class="input-field">
              <input
                id="name"
                type="text"
                v-model="title"
                :class="{invalid: v$.title.$dirty && v$.title.required.$invalid}"
            >
            <label for="name">Title</label>
            <span
            class="helper-text invalid"
            v-if="v$.limit.$dirty && v$.title.required.$invalid"
            >
            Enter title
            </span>
            </div>

            <div class="input-field">
              <input
                id="limit"
                type="number"
				name="limit"
                v-model.number="limit"
                :class="{invalid: v$.limit.$dirty && v$.limit.minValue.$invalid}"
              >
              <label htmlFor="limit">Limit</label>
              <span 
                v-if="v$.limit.$dirty && v$.limit.minValue.$invalid"
                class="helper-text invalid"
              >
              Minimal amount is: {{v$.limit.minValue.$params.min}}</span>		
            </div>

            <button class="btn waves-effect waves-light" type="submit">
              Create
              <i class="material-icons right">send</i>
            </button>
          </form>
        </div>
    </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import {required, minValue, numeric} from "@vuelidate/validators";

export default {
  data: () => ({
    title: '',
    limit: ''
  }),
  setup: () => ({ v$: useVuelidate() }),
  validations ()  {
    return {
      title: { required },
      limit: { minValue: minValue(1), numeric }
      }
  },
  methods: {
    async submitHandler() {
      if (this.v$.$invalid) {
        this.v$.$touch()
        return
    }
      try {
        const category = await this.$store.dispatch('createCategory', {
          title: this.title,
          limit: this.limit
        })
          this.title = ''
          this.limit = ''
          this.v$.$reset()
          this.$message('Category was created')
          this.$emit('created', category)
      } catch (e) {
        console.log('Error???', e);
      }
    }
  },    
  mounted() {
    M.updateTextFields()
  },
}
</script>