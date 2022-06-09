<template>
  <div class="app-main-layout">

    <navbar-vue @clicks="isOpen = !isOpen"/>
    <sidebar-vue v-model:isOpen="isOpen" />

    <main class="app-content" :class="{full: !isOpen}">
      <div class="app-page" >

<router-view />

      </div>
    </main>
  <div class="fixed-action-btn">
    <router-link class="btn-floating btn-large blue" to="/record">
        <i class="large material-icons">add</i>
    </router-link>
  </div>
</div>
</template>


<script>
import NavbarVue from '@/components/app/NavbarVue.vue'
import SidebarVue from '@/components/app/SidebarVue.vue'

export default {
  name: 'main-layout',
    data: () => ({
    isOpen: true
  }),
 async mounted() {
    if(!Object.keys(this.$store.getters.info).length) {
      await this.$store.dispatch('fetchInfo')
    }
  },
  components: {
    NavbarVue, SidebarVue
  },
}
</script>