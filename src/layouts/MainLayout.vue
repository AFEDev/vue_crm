<template>
  <div class="app-main-layout">

    <navbar-vue />
    <sidebar-vue />

    <main class="app-content">
      <div class="app-page">

<router-view />

      </div>
    </main>
  <div class="fixed-action-btn">
    <a class="btn-floating btn-large blue" href="#">
        <i class="large material-icons">add</i>
    </a>
  </div>
</div>
</template>


<script>
import NavbarVue from '@/components/app/NavbarVue.vue'
import SidebarVue from '@/components/app/SidebarVue.vue'

export default {
  name: 'main-layout',
  components: {
NavbarVue, SidebarVue
  },
}

</script>