<template>
    <div class="col s12 m6">
        <div>
          <div class="page-subtitle">
            <h4>Edit</h4>
          </div>

          <form>
            <div class="input-field" >
              <select ref="select">
                <option
                v-for="c of categories"
                :key="c.id"
                :value="c.id"
                >{{c.title}}</option>
              </select>
              <label>Selec category</label>
            </div>

            <div class="input-field">
              <input type="text" id="name">
              <label for="name">Title</label>
              <span class="helper-text invalid">TITLE</span>
            </div>

            <div class="input-field">
              <input
                  id="limit"
                  type="number"
                  :value="filter.title"
              >
              <label for="limit">Limit</label>
              <span class="helper-text invalid">LIMIT</span>
            </div>

            <button class="btn waves-effect waves-light" type="submit">
              Update
              <i class="material-icons right">send</i>
            </button>
          </form>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        categories: {
            type: Array,
            required: true,
        }
    },
    data: () => ({
        select: null,
        filter: {}
    }),
    mounted() {
       this.select = M.FormSelect.init(this.$refs.select);
       const key = this.select.getSelectedValues()
        let filter = this.categories.find(e => e.id == key)
        this.filter = filter
        console.log(this.filter);


    },
    unmounted() {
        if (this.select && this.select.destroy) {
            this.select.destroy()
        }
    },
    methods: {
        getValue () {
            console.log(categories[this.select.getSelectedValues()]);
        }
    }
}
</script>