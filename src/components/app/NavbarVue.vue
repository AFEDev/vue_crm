<template>
  <nav class="navbar orange lighten-1">
    <div class="nav-wrapper">
      <div class="navbar-left">
        <a href="#" @click.prevent="$emit('clicks')">
          <i class="material-icons black-text">dehaze</i>
        </a>
        <span class="black-text">{{ $filters.dateFilter(date, "datetime") }}</span>
      </div>

      <ul class="right hide-on-small-and-down">
        <li>
          <a class="dropdown-trigger black-text" href="#" data-target="dropdown" ref="dropdown">
            {{ name }}
            <i class="material-icons right">arrow_drop_down</i>
          </a>

          <ul id="dropdown" class="dropdown-content">
            <li>
              <router-link to="/profile" class="black-text">
                <i class="material-icons">account_circle</i>Account
              </router-link>
            </li>
            <li class="divider" tabindex="-1"></li>
            <li>
              <a href="#" class="black-text" @click.prevent="logout">
                <i class="material-icons">assignment_return</i>Logout
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  data: () => ({
    date: new Date(),
    interval: null,
    dropdown: null,
  }),
  methods: {
    async logout() {
      await this.$store.dispatch("logout");
      this.$router.push("/login?message=logout");
    },
  },
  computed: {
    name() {
      return this.$store.getters.info.name;
    },
  },
  mounted() {
    this.interval = setInterval(() => {
      this.date = new Date();
    });
    //Initialization of dropdown list (materializecss) Make sure that the data-target attribute matches the id in the <ul> tag.
    this.dropdown = M.Dropdown.init(this.$refs.dropdown, {
      //If true, constrainWidth to the size of the dropdown activator.
      constrainWidth: true,
    });
  },
  beforeUnmount() {
    clearInterval(this.interval);
    if (this.dropdown && this.dropdown.destroy) {
      this.dropdown.destroy();
    }
  },
};
</script>
