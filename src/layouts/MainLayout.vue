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
    data: () => ({
    isOpen: true
  }),
  components: {
NavbarVue, SidebarVue
  },
}
</script>