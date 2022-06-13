<template>
    <div class="col s12 m6">
        <div>
          <div class="page-subtitle">
            <h4>Create</h4>
          </div>

          <form>
            <div class="input-field">
              <input
                id="name"
                type="text"
                v-model="v$.title.$model" 
                @blur="v$.title.$commit"
              >
              <label for="name">Name</label>
                    <span class="helper-text" v-for="(error, index) of v$.email.$errors" :key="index">
          {{error.$message}}
        </span>
            </div>

            <div class="input-field">
              <input
                id="limit"
                type="number"
				name="limit"
              >
              <label htmlFor="limit">Limit</label>
              <span class="helper-text invalid">Minimal sum</span>
							
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
import {required, minLength, numeric} from "@vuelidate/validators";
export default{
        data: () => ({
        title: '',
        limit: 1
    }),
    setup () {
        const rules = {
        title: {required},
        limit: {minLength: minLength(1), numeric}
            }
        const title = ref(null)
        return {
            v$: useVuelidate(rules, { title }, { $rewardEarly: true }),
        }
    },
}
</script>